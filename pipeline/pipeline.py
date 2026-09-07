#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Ollama 生成 → 動的テスト環境で検証 → func/sec@k 集計 を一気通貫で自動化する。

流れ:
  1) ollama を起動（未起動なら `ollama serve` をバックグラウンドで立ち上げ）
  2) モデルに「機能仕様だけ」を与えてコードを k 世代生成させる
  3) 生成物を各言語ランナー(Docker)に流し、プロセス外計測で func/sec を判定
  4) func@k / sec@k / func-sec@k を集計して出力

このスクリプト自体は言語非依存。言語ごとの差分（ファイル名・プロンプトの雛形）だけを
LANGS テーブルに閉じ込め、隔離/計測は既存の runners イメージ(dyntest-<lang>)に委譲する。

使い方:
  python3 pipeline/pipeline.py --lang go --model qwen3.5:4b -k 3
  python3 pipeline/pipeline.py --lang go --dry-run          # 生成だけ（Docker を使わない）
"""
import argparse
import base64
import json
import math
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.request

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# OLLAMA_URL で差し替え可能（Ollama API 互換のシム/プロキシ経由で他バックエンドを使うため）
OLLAMA = os.environ.get("OLLAMA_URL", "http://127.0.0.1:11434")

# 言語ごとの差分だけをここに閉じ込める（隔離/計測は共通イメージ側）
LANGS = {
    "go": {"filename": "main.go", "image": "dyntest-go"},
    "ts": {"filename": "main.ts", "image": "dyntest-ts"},
    "java": {"filename": "Main.java", "image": "dyntest-java"},
}
# モデルへ送る文言（言語ヒントを含む）は pipeline/prompts.json 側で管理する。

# 共通の隔離フラグ（README / run_demo.sh と同一）
ISOLATION = [
    "--rm", "--network", "none",
    "--memory", "512m", "--memory-swap", "512m",
    "--pids-limit", "256",
]


# 環境エラー（Docker 不達など）で終了するときの exit code。
# 「モデルの出来が悪い」結果と区別するため、通常の失敗と別の値にしている。
EXIT_ENV_ERROR = 2


class DockerUnavailable(RuntimeError):
    """Docker ランナーが結果 JSON を返さなかった（＝測定が成立していない）。"""


# ---------------------------------------------------------------- docker 確認 --
def ensure_docker():
    """docker デーモンに疎通できるか先に確認する。
    落ちたまま走らせると全ケースが docker_err になり、func=0/10 の
    「もっともらしいが無効なレポート」が残るため、生成を始める前に止める。"""
    if not shutil.which("docker"):
        print("docker コマンドが見つかりません。Docker Desktop をインストールしてください。",
              file=sys.stderr)
        sys.exit(EXIT_ENV_ERROR)
    p = subprocess.run(["docker", "info"], capture_output=True, text=True)
    if p.returncode != 0:
        first = (p.stderr or p.stdout).strip().splitlines()
        print("docker デーモンに接続できません。Docker Desktop を起動してから再実行してください。",
              file=sys.stderr)
        if first:
            print(f"  {first[-1]}", file=sys.stderr)
        sys.exit(EXIT_ENV_ERROR)


# ---------------------------------------------------------------- ollama 起動 --
def ensure_ollama(auto_serve=True, wait_s=30):
    """ollama サーバが応答するか確認し、未起動なら serve を起こす。"""
    def up():
        try:
            urllib.request.urlopen(OLLAMA + "/api/tags", timeout=2).read()
            return True
        except Exception:
            return False

    if up():
        return None
    if not auto_serve:
        sys.exit("ollama が起動していません（--no-serve 指定中）。`ollama serve` を先に実行してください。")
    if not shutil.which("ollama"):
        sys.exit("ollama コマンドが見つかりません。https://ollama.com からインストールしてください。")

    print("… ollama serve を起動します", file=sys.stderr)
    logf = open(os.path.join(tempfile.gettempdir(), "ollama_serve.log"), "ab")
    proc = subprocess.Popen(["ollama", "serve"], stdout=logf, stderr=logf)
    for _ in range(wait_s):
        if up():
            print("… ollama serve 起動完了", file=sys.stderr)
            return proc
        time.sleep(1)
    sys.exit("ollama serve の起動待ちがタイムアウトしました。")


def ensure_model(model):
    """モデルがローカルに無ければ pull する。"""
    try:
        tags = json.loads(urllib.request.urlopen(OLLAMA + "/api/tags", timeout=5).read())
        names = {m["name"] for m in tags.get("models", [])}
        names |= {n.split(":")[0] for n in names}
        if model in names or model.split(":")[0] in names:
            return
    except Exception:
        pass
    print(f"… モデル {model} をローカルに取得（pull）します", file=sys.stderr)
    subprocess.run(["ollama", "pull", model], check=True)


# --------------------------------------------------------------------- 生成 --
DEFAULT_SHOTS_FILE = "shots.json"
_SHOTS = {}

# プロンプトの文言は pipeline/prompts.json で管理する（コードは組み立てのみ）。
# セット名を変えることで「同じタスクにプロンプトだけ別アームを当てる」ことができる。
DEFAULT_PROMPTS_FILE = "prompts.json"
DEFAULT_PROMPT_SET = "default"
_PROMPTS = {}


def load_prompt_set(name=DEFAULT_PROMPT_SET, prompts_file=DEFAULT_PROMPTS_FILE):
    """prompts.json から 1 セットを読む。`extends` は指定セットで上書きする浅いマージ。"""
    path = os.path.join(REPO, "pipeline", prompts_file)
    if path not in _PROMPTS:
        _PROMPTS[path] = json.load(open(path))
    doc = _PROMPTS[path]
    if name not in doc or name.startswith("_"):
        sys.exit(f"未知のプロンプトセット: {name}"
                 f"（候補: {', '.join(k for k in doc if not k.startswith('_'))}）")
    entry = doc[name]
    base = doc[entry["extends"]] if "extends" in entry else {}
    merged = dict(base)
    merged.update({k: v for k, v in entry.items() if k not in ("extends", "description")})
    return merged


def fill(template, **kw):
    """{name} を素朴に置換する。仕様文や生成コードに波括弧が現れても壊れないよう
    str.format は使わない（置換対象は既知のプレースホルダだけ）。"""
    for k, v in kw.items():
        template = template.replace("{" + k + "}", str(v))
    return template


def shots_path(name):
    """例示セット名/パスを絶対パスへ。`shots_safe` のような素の名前も受ける。"""
    if os.path.sep in name:
        return os.path.abspath(name)
    if not name.endswith(".json"):
        name += ".json"
    return os.path.join(REPO, "pipeline", name)


def load_shots(lang, shots_file=DEFAULT_SHOTS_FILE):
    """few-shot 例示（別タスクの完成コード）を指定の例示セットから読む。
    例示の資源安全性を独立変数にするため、セットを差し替えられるようにしてある。"""
    p = shots_path(shots_file)
    if p not in _SHOTS:
        _SHOTS[p] = json.load(open(p))
    return _SHOTS[p].get(lang, [])


def build_prompt(task, lang, n_shots=0, shots_file=DEFAULT_SHOTS_FILE,
                 prompt_set=DEFAULT_PROMPT_SET):
    """n_shots=0 は zero-shot（仕様のみ）、1 は one-shot、>=2 は few-shot。
    例示は本タスクとは別問題の完成コードで、解答をリークしない。
    文言は prompts.json 側にあり、ここは組み立てだけを行う。"""
    P = load_prompt_set(prompt_set)

    shot_block = ""
    if n_shots > 0:
        sh = P["shots"]
        shots = load_shots(lang, shots_file)[:n_shots]
        parts = [sh["intro"]]
        for i, s in enumerate(shots, 1):
            parts.append(fill(sh["example"], i=i, problem=s["problem"], lang=lang, code=s["code"]))
        parts.append(sh["outro"])
        shot_block = sh["joiner"].join(parts) + sh["suffix"]

    spec_lines = list(task["spec"]) + list(P.get("extra_spec") or [])
    spec = "\n".join(fill(P["spec_item"], item=x) for x in spec_lines)

    return (
        P["head"]
        + shot_block
        + fill(P["spec_block"], spec=spec)
        + fill(P["format_block"], lang_hint=P["lang_hints"][lang], lang=lang)
    )


def generate(model, prompt, temperature, think=False):
    # think=False: thinking 系モデル(qwen3.5 等)が推論に予算を使い切り response を空にするのを防ぐ。
    #   ただし thinking を切ると小型モデルは品質が落ちるため、必要なら --think で有効化する
    #   （その場合 num_ctx を広げないと応答が切れることがある）。
    opts = {"temperature": temperature}
    if think:
        opts["num_ctx"] = 8192
    body = json.dumps({
        "model": model,
        "prompt": prompt,
        "stream": False,
        "think": think,
        "options": opts,
    }).encode()
    req = urllib.request.Request(OLLAMA + "/api/generate", data=body,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=600) as r:
        return json.loads(r.read())["response"]


def extract_code(text, lang):
    """モデル出力からコード本体を取り出す。フェンス優先、無ければ全文。"""
    m = re.search(rf"```{lang}\s*\n(.*?)```", text, re.DOTALL)
    if not m:
        m = re.search(r"```[a-zA-Z0-9]*\s*\n(.*?)```", text, re.DOTALL)
    return (m.group(1) if m else text).strip() + "\n"


# ----------------------------------------------------------------- 入力生成 --
def realize_input(spec):
    """input_generator の実体化（言語非依存の敵対的入力を作る）。"""
    t = spec["type"]
    if t == "literal":
        return spec["value"]
    if t == "range":                       # 0..n-1 を全て相異なる値として並べる
        # sep/prefix/suffix は省略時に従来どおり（カンマ区切りの1行）。
        # 改行区切りにすると、1行が短くなり Go の bufio.Scanner 64KB 上限に当たらない。
        body = spec.get("sep", ",").join(map(str, range(spec["n"])))
        return spec.get("prefix", "") + body + spec.get("suffix", "")
    if t == "repeat":                      # value を n 回（例: repeat 同一値）
        return ",".join([str(spec["value"])] * spec["n"])
    if t == "repeat_str":                  # value を n 回そのまま連結（区切り無し）
        return spec.get("prefix", "") + str(spec["value"]) * spec["n"] + spec.get("suffix", "")
    if t == "arith":                       # 等差数列 start, start+step, ... を n 個
        seq = (spec["start"] + i * spec["step"] for i in range(spec["n"]))
        body = spec.get("sep", "\n").join(map(str, seq))
        return spec.get("prefix", "") + body + spec.get("suffix", "")
    if t == "concat":                      # 複数の入力仕様を連結する
        return "".join(realize_input(s) for s in spec["parts"])
    raise ValueError(f"unknown input type: {t}")


# ------------------------------------------------------------ 1 ケース実行 --
def run_case(lang, code, case, keep=False):
    """生成コードを Docker ランナーに流し、result JSON(dict) を返す。"""
    work = tempfile.mkdtemp(prefix="dyn_")
    try:
        with open(os.path.join(work, LANGS[lang]["filename"]), "w") as f:
            f.write(code)
        with open(os.path.join(work, "input.txt"), "w") as f:
            f.write(realize_input(case["input"]))

        cmd = ["docker", "run", *ISOLATION,
               "-v", f"{work}:/work",
               "-e", f"LABEL={case['label']}",
               "-e", f"TIMEOUT_S={case['timeout_s']}",
               "-e", "INPUT_FILE=/work/input.txt",
               LANGS[lang]["image"]]
        p = subprocess.run(cmd, capture_output=True, text=True)
        line = p.stdout.strip().splitlines()[-1] if p.stdout.strip() else ""
        try:
            return json.loads(line)
        except json.JSONDecodeError:
            # ランナーが結果 JSON を返さない＝デーモン停止やイメージ不備で、
            # 測定自体が成立していない。不合格として集計せず中断する。
            raise DockerUnavailable((p.stderr or p.stdout).strip()[:2000]
                                    or f"docker run が空の出力を返しました ({case['label']})")
    finally:
        if keep:
            print(f"    workdir: {work}", file=sys.stderr)
        else:
            shutil.rmtree(work, ignore_errors=True)


# ------------------------------------------------------------------ 判定 --
def decode_stdout(res):
    m = res.get("measure") or {}
    return base64.b64decode(m.get("stdout_b64", "")).decode("utf-8", "replace").strip()


def build_fail_reason(res):
    """build_ok=false の理由を短く復元（ビルドエラー先頭行 / docker エラー）。"""
    if res.get("docker_err"):
        return f"docker_err: {res['docker_err'].splitlines()[0]}"
    err = base64.b64decode(res.get("build_err_b64", "")).decode("utf-8", "replace").strip()
    # Go の `go build` は先頭に `# <pkg>` 見出し行を出すので、実エラー行まで読み飛ばす
    lines = [ln for ln in err.splitlines() if ln.strip() and not ln.startswith("#")]
    return f"build_fail: {lines[0]}" if lines else "build_fail"


def judge_functional(res, case):
    if not res.get("build_ok"):
        return False, build_fail_reason(res)
    m = res.get("measure") or {}
    if m.get("timed_out") or m.get("exit_code") != 0:
        return False, f"exit={m.get('exit_code')} timed_out={m.get('timed_out')}"
    if "expected" in case and decode_stdout(res) != case["expected"]:
        return False, f"mismatch: {decode_stdout(res)!r}"
    return True, "ok"


def judge_availability(res, case):
    if not res.get("build_ok"):
        return False, build_fail_reason(res)
    m = res.get("measure") or {}
    if m.get("timed_out"):
        return False, "TIMEOUT"
    if m.get("oom_killed"):
        return False, "OOM"
    # 異常終了も可用性の失敗として扱う（JVM の OutOfMemoryError のように
    # コンテナ OOM killer に届かず exit!=0 で落ちる経路を取りこぼさないため）。
    if m.get("exit_code") != 0:
        return False, f"crash: exit={m.get('exit_code')}"
    limit = case.get("rss_limit_kb")
    if limit and m.get("peak_rss_kb", 0) > limit:
        return False, f"rss {m['peak_rss_kb']}KB > {limit}KB"
    # 資源だけ見ていると「敵対的入力を途中までしか読まずに省資源で終わる」実装が
    # 合格してしまう（例: bufio.Scanner の 64KB トークン上限で 1 行を読み切れず無出力）。
    # 可用性 = 「敵対的入力でも正しく応答し続ける」なので、期待出力があれば照合する。
    if "expected" in case:
        got = decode_stdout(res)
        if got != case["expected"]:
            return False, f"wrong_answer: {got[:40]!r}"
    return True, f"wall={m.get('wall_s')}s rss={m.get('peak_rss_kb')}KB"


# ------------------------------------------------------- pass@k（不偏推定） --
def pass_at_k(n, c, k):
    """Chen et al. (HumanEval) の不偏推定量。n=総生成数, c=合格数, k=想定回数。"""
    if k > n:
        k = n
    if n - c < k:
        return 1.0
    return 1.0 - math.comb(n - c, k) / math.comb(n, k)


# ------------------------------------------------------------ レポート出力 --
def write_report(report_dir, meta, records, code_ext):
    """report_dir に result.md（サマリ）と code/（全世代ソース）を書き出す。"""
    code_dir = os.path.join(report_dir, "code")
    os.makedirs(code_dir, exist_ok=True)
    for r in records:
        with open(os.path.join(code_dir, f"gen_{r['i']:02d}.{code_ext}"), "w") as f:
            f.write(r["code"])

    n = meta["n"]
    func_pass = sum(r["func"] for r in records)
    sec_pass = sum(r["sec"] for r in records)
    both_pass = sum(r["both"] for r in records)

    L = []
    shot_label = {0: "zero-shot", 1: "one-shot"}.get(meta.get("shots", 0), f"few-shot({meta.get('shots')})")
    L.append(f"# 検証結果: {meta['model']} / {meta['lang']} "
             f"(temperature={meta['temp']}, {shot_label}, think={str(meta['think']).lower()})")
    L.append("")
    L.append(f"- **タスク**: `{meta['task']}`（{meta['title']}）")
    L.append(f"- **言語**: {meta['lang']}")
    L.append(f"- **プロンプト**: {shot_label}（例示 {meta.get('shots', 0)} 件）")
    if meta.get("shots") and meta.get("shots_file", DEFAULT_SHOTS_FILE) != DEFAULT_SHOTS_FILE:
        L.append(f"- **例示セット**: `{meta['shots_file']}`")
    if meta.get("prompt_set", DEFAULT_PROMPT_SET) != DEFAULT_PROMPT_SET:
        L.append(f"- **プロンプトセット**: `{meta['prompt_set']}`（`pipeline/prompts.json`）")
    L.append(f"- **世代数 k**: {n}")
    L.append(f"- **temperature**: {meta['temp']}")
    L.append(f"- **think**: {str(meta['think']).lower()}")
    L.append("")
    L.append("## 集計")
    L.append("")
    L.append("| 指標 | 値 |")
    L.append("|---|---|")
    L.append(f"| 合格数 | func=**{func_pass}/{n}**, sec={sec_pass}/{n}, func-sec={both_pass}/{n} |")
    L.append(f"| func@{n} | **{pass_at_k(n, func_pass, n):.3f}** |")
    L.append(f"| sec@{n} | **{pass_at_k(n, sec_pass, n):.3f}** |")
    L.append(f"| func-sec@{n} | **{pass_at_k(n, both_pass, n):.3f}** |")
    gap = pass_at_k(n, func_pass, n) - pass_at_k(n, both_pass, n)
    L.append(f"| セキュリティギャップ (func@{n} − func-sec@{n}) | {gap:.3f} |")
    L.append("")
    L.append("## 試行回ごとの結果")
    L.append("")
    L.append("| 試行回 | 行数 | func | sec | 詳細 |")
    L.append("|---|---|---|---|---|")
    for r in records:
        detail = "; ".join(f"{c['label']}: {c['why']}" for c in r["cases"])
        fm = "✓" if r["func"] else "✗"
        sm = "✓" if r["sec"] else "✗"
        L.append(f"| {r['i']} | {r['lines']} | {fm} | {sm} | {detail} |")
    L.append("")
    L.append("## 失敗理由の内訳")
    L.append("")
    reasons = {}
    for r in records:
        if r["both"]:
            continue
        for c in r["cases"]:
            if not c["ok"]:
                reasons[c["why"]] = reasons.get(c["why"], 0) + 1
    if reasons:
        L.append("| 理由 | 件数(ケース単位) |")
        L.append("|---|---|")
        for why, cnt in sorted(reasons.items(), key=lambda x: -x[1]):
            L.append(f"| {why} | {cnt} |")
    else:
        L.append("失敗なし（全世代 func-sec 合格）。")
    L.append("")
    L.append("## k を下げた場合（func-sec 合格数から算出）")
    L.append("")
    L.append("| k | func@k | sec@k | func-sec@k |")
    L.append("|---|---|---|---|")
    for kk in sorted({1, 3, 5, n}):
        if kk > n:
            continue
        L.append(f"| {kk} | {pass_at_k(n, func_pass, kk):.3f} | "
                 f"{pass_at_k(n, sec_pass, kk):.3f} | {pass_at_k(n, both_pass, kk):.3f} |")
    L.append("")
    L.append("## 再現コマンド")
    L.append("")
    L.append("```bash")
    thinkflag = " --think" if meta["think"] else ""
    shotflag = f" --shots {meta['shots']}" if meta.get("shots") else ""
    if meta.get("shots") and meta.get("shots_file", DEFAULT_SHOTS_FILE) != DEFAULT_SHOTS_FILE:
        shotflag += f" --shots-file {meta['shots_file']}"
    taskflag = f" --task {meta['task']}" if meta.get("task") != "cwe400_unique" else ""
    promptflag = ("" if meta.get("prompt_set", DEFAULT_PROMPT_SET) == DEFAULT_PROMPT_SET
                  else f" --prompt {meta['prompt_set']}")
    L.append(f"python3 pipeline/pipeline.py{taskflag} --lang {meta['langflag']} "
             f"--model {meta['model']} -k {n} --temperature {meta['temp']}"
             f"{shotflag}{promptflag}{thinkflag}")
    L.append("```")
    L.append("")
    L.append(f"生成された全世代のソースは同ディレクトリの `code/gen_01.{code_ext}` … に格納。")
    L.append("")

    with open(os.path.join(report_dir, "result.md"), "w") as f:
        f.write("\n".join(L))
    print(f"■ レポート出力: {os.path.join(report_dir, 'result.md')}")


def log_prompt(args, task, prompt, n):
    """送ったプロンプトを prompt/ に蓄積する（論文の付録にそのまま載せるため）。
    ここでの失敗は検証結果を捨てる理由にならないので握りつぶして警告だけ出す。"""
    import datetime
    sys.path.insert(0, os.path.join(REPO, "pipeline"))
    import prompt_log
    d = os.path.abspath(args.report_dir)
    rel = os.path.relpath(d, REPO) if d.startswith(REPO + os.sep) else d
    run = {"report_dir": rel, "model": args.model, "temp": args.temperature,
           "k": n, "think": args.think, "date": datetime.date.today().isoformat()}
    try:
        path = prompt_log.record(args.task, task, args.lang, args.shots, prompt, run,
                                 args.shots_file, args.prompt)
        prompt_log.write_index()
        print(f"■ プロンプト記録: {os.path.relpath(path, REPO)}")
    except Exception as e:  # noqa: BLE001 - 記録の失敗で結果を落とさない
        print(f"！プロンプトの記録に失敗（結果は保存済み）: {e}", file=sys.stderr)


# ------------------------------------------------------------------ main --
def main():
    ap = argparse.ArgumentParser(description="Ollama 生成 → 動的テスト検証 → func/sec@k 集計")
    ap.add_argument("--lang", default="go", choices=LANGS.keys())
    ap.add_argument("--model", default="gemma4:e2b")
    ap.add_argument("--task", default="cwe400_unique")
    ap.add_argument("-k", "--num", type=int, default=1, help="生成世代数 n")
    ap.add_argument("--temperature", type=float, default=0.6)
    ap.add_argument("--shots", type=int, default=0,
                    help="例示数: 0=zero-shot, 1=one-shot, >=2=few-shot")
    ap.add_argument("--shots-file", default=DEFAULT_SHOTS_FILE,
                    help="例示セット（既定 shots.json）。shots_safe / shots_unsafe で"
                         "例示の資源安全性を切り替える")
    ap.add_argument("--prompt", default=DEFAULT_PROMPT_SET,
                    help="プロンプトセット（既定 default）。文言は pipeline/prompts.json で管理する")
    ap.add_argument("--print-prompt", action="store_true",
                    help="組み立てたプロンプトを表示して終了する（生成も検証もしない）")
    ap.add_argument("--think", action="store_true",
                    help="thinking を有効化（qwen3.5 等の thinking モデル向け・低速）")
    ap.add_argument("--no-serve", action="store_true", help="serve を自動起動しない")
    ap.add_argument("--dry-run", action="store_true", help="生成だけ行い Docker 検証をしない")
    ap.add_argument("--keep", action="store_true", help="作業ディレクトリを残す")
    ap.add_argument("--report-dir", help="指定すると result.md と全世代コードを書き出す")
    args = ap.parse_args()

    tasks = json.load(open(os.path.join(REPO, "pipeline", "tasks.json")))
    if args.task not in tasks:
        sys.exit(f"未知のタスク: {args.task}（候補: {', '.join(tasks)}）")
    task = tasks[args.task]

    prompt = build_prompt(task, args.lang, args.shots, args.shots_file, args.prompt)
    if args.print_prompt:
        print(prompt, end="")
        return

    if not args.dry_run:
        ensure_docker()
    ensure_ollama(auto_serve=not args.no_serve)
    ensure_model(args.model)

    gen_dir = os.path.join(REPO, "generated", args.lang)
    os.makedirs(gen_dir, exist_ok=True)

    print(f"■ タスク: {task['title']}  [{task.get('cwe','')}]")
    print(f"■ 言語={args.lang} モデル={args.model} 世代数={args.num} temp={args.temperature}\n")

    code_ext = LANGS[args.lang]["filename"].split(".")[-1]
    records = []
    func_pass = sec_pass = both_pass = 0
    for i in range(args.num):
        print(f"── 世代 {i+1}/{args.num} ──")
        code = extract_code(generate(args.model, prompt, args.temperature, args.think), args.lang)
        src_path = os.path.join(gen_dir, f"{args.task}_{i+1}.{code_ext}")
        with open(src_path, "w") as f:
            f.write(code)
        print(f"   生成コード: {src_path} ({len(code.splitlines())} 行)")

        if args.dry_run:
            continue

        f_ok = s_ok = True
        cases = []
        for case in task["testcases"]:
            try:
                res = run_case(args.lang, code, case, keep=args.keep)
            except DockerUnavailable as e:
                print(f"\n■ 中断: Docker ランナーが結果を返しませんでした（世代 {i+1}, {case['label']}）",
                      file=sys.stderr)
                print(f"  {str(e).splitlines()[0]}", file=sys.stderr)
                print("  ここまでの結果は無効なのでレポートは書き出しません。"
                      "Docker を復旧してから再実行してください。", file=sys.stderr)
                sys.exit(EXIT_ENV_ERROR)
            if case["kind"] == "functional":
                ok, why = judge_functional(res, case)
                f_ok = f_ok and ok
            else:
                ok, why = judge_availability(res, case)
                s_ok = s_ok and ok
            cases.append({"label": case["label"], "kind": case["kind"], "ok": ok, "why": why})
            mark = "✓" if ok else "✗"
            print(f"   [{case['kind']:12s}] {case['label']:20s} {mark} {why}")

        func_pass += f_ok
        sec_pass += s_ok
        both_pass += (f_ok and s_ok)
        records.append({"i": i + 1, "code": code, "lines": len(code.splitlines()),
                        "func": bool(f_ok), "sec": bool(s_ok), "both": bool(f_ok and s_ok),
                        "cases": cases})
        print(f"   → func={f_ok} sec={s_ok} func-sec={f_ok and s_ok}\n")

    if args.dry_run:
        print("（--dry-run: 検証はスキップ）")
        return

    n, k = args.num, args.num
    print("═══ 集計 ═══")
    print(f"  合格数: func={func_pass}/{n}  sec={sec_pass}/{n}  func-sec={both_pass}/{n}")
    print(f"  func@{k}      = {pass_at_k(n, func_pass, k):.3f}")
    print(f"  sec@{k}       = {pass_at_k(n, sec_pass, k):.3f}")
    print(f"  func-sec@{k}  = {pass_at_k(n, both_pass, k):.3f}")
    print(f"  → セキュリティギャップ func@{k} − func-sec@{k} "
          f"= {pass_at_k(n, func_pass, k) - pass_at_k(n, both_pass, k):.3f}")

    if args.report_dir:
        meta = {"model": args.model, "lang": args.lang, "langflag": args.lang,
                "temp": args.temperature, "think": args.think, "n": n,
                "shots": args.shots, "shots_file": args.shots_file,
                "prompt_set": args.prompt,
                "task": args.task, "title": task["title"]}
        write_report(args.report_dir, meta, records, code_ext)
        log_prompt(args, task, prompt, n)


if __name__ == "__main__":
    main()
