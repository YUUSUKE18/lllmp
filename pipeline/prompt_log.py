#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""検証ごとに実際に送ったプロンプトを `prompt/` へ markdown で蓄積する。

論文の付録に「どの条件にどの文字列を送ったか」をそのまま載せられるようにするのが目的。

プロンプトは **タスク × 言語 × 例示数 × 例示セット × プロンプトセット** だけで決まり、
モデル・温度・k には依存しない。そこで 1 ファイル = 1 プロンプトとし、
同じプロンプトを使った検証は同じファイルの表に積み上げる（重複本文を作らない）。

使い方:
  # 通常は pipeline.py が result.md を書くときに自動で呼ぶ。
  # 過去の検証をまとめて復元する:
  python3 pipeline/prompt_log.py --backfill
"""
import argparse
import glob
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROMPT_DIR = os.path.join(REPO, "prompt")
FENCE = "````"  # プロンプト本文に ``` が含まれるので4連バッククォートで囲む

COLS = ["取得日", "条件", "モデル", "temp", "k", "think", "記録"]


def shot_label(shots):
    return {0: "zero-shot", 1: "one-shot"}.get(shots, f"few-shot({shots})")


def stem(task_name, lang, shots, shots_file="shots.json", prompt_set="default"):
    """ファイル名。既定の例示セット/プロンプトセットのときは名前を増やさない。"""
    label = {0: "zeroshot", 1: "oneshot"}.get(shots, f"fewshot{shots}")
    parts = [task_name, lang, label]
    if shots and shots_file not in ("shots.json", "shots"):
        parts.append(os.path.splitext(os.path.basename(shots_file))[0])
    if prompt_set != "default":
        parts.append(prompt_set)
    return "_".join(parts)


def _parse_rows(path):
    """既存ファイルの検証表を {条件: 行} で読み戻す（追記のたびに全体を書き直すため）。"""
    rows = {}
    if not os.path.exists(path):
        return rows
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if not line.startswith("|") or line.startswith("|---") or "取得日" in line:
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) != len(COLS):
            continue
        rows[cells[1]] = cells
    return rows


def record(task_name, task, lang, shots, prompt, run,
           shots_file="shots.json", prompt_set="default", restored=False):
    """1 検証分を蓄積する。run は {report_dir, model, temp, k, think, date}。"""
    os.makedirs(PROMPT_DIR, exist_ok=True)
    path = os.path.join(PROMPT_DIR, stem(task_name, lang, shots, shots_file, prompt_set) + ".md")

    rows = _parse_rows(path)
    cond = f"`{run['report_dir']}`"
    # 実行時に書いた行は後からの復元で上書きしない（実行時の記録の方が確かなため）。
    if not (restored and rows.get(cond, [None] * len(COLS))[-1] == "実行時"):
        rows[cond] = [run["date"], cond, f"`{run['model']}`", str(run["temp"]),
                      str(run["k"]), str(run["think"]).lower(),
                      "復元" if restored else "実行時"]

    L = [f"# {task_name} / {lang} / {shot_label(shots)}", ""]
    L.append(f"- **タスク**: `{task_name}`（{task.get('title', '')}）")
    L.append(f"- **言語**: {lang}")
    L.append(f"- **例示**: {shot_label(shots)}"
             + (f"（セット `{shots_file}`）" if shots else ""))
    L.append(f"- **プロンプトセット**: `{prompt_set}`（`pipeline/prompts.json`）")
    L.append(f"- **このプロンプトを使った検証**: {len(rows)} 条件")
    L.append("")
    L.append("## 送信したプロンプト（全文・実際に送った文字列そのまま）")
    L.append("")
    L.append(FENCE + "text")
    L.append(prompt.rstrip("\n"))
    L.append(FENCE)
    L.append("")
    L.append("## このプロンプトを使った検証")
    L.append("")
    L.append("| " + " | ".join(COLS) + " |")
    L.append("|" + "---|" * len(COLS))
    for cond in sorted(rows):
        L.append("| " + " | ".join(rows[cond]) + " |")
    L.append("")
    L.append("- **記録**: `実行時` は検証を回したときに書いたもの。"
             "`復元` は後から現行の `tasks.json` / `prompts.json` で組み直したもの"
             "（仕様文を変更したタスクでは取得当時と一致しない可能性がある）。")
    L.append("")

    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(L))
    return path


def write_index():
    """prompt/README.md に索引を書き出す。"""
    files = sorted(f for f in os.listdir(PROMPT_DIR)
                   if f.endswith(".md") and f != "README.md")
    L = ["# 検証で送ったプロンプトの記録", ""]
    L.append("実際にモデルへ送った文字列を、検証（条件）ごとに蓄積したもの。"
             "論文の付録にそのまま転記できるように、要約せず全文を残している。")
    L.append("")
    L.append("- **1 ファイル = 1 プロンプト**。プロンプトは"
             "**タスク × 言語 × 例示数 × 例示セット × プロンプトセット**で決まり、"
             "モデル・温度・k には依存しないので、同じ文字列を使った検証は同じファイルの表に並ぶ。")
    L.append("- 生成元は `pipeline/prompts.json`（文言）と `pipeline/tasks.json`（仕様）、"
             "`pipeline/shots*.json`（例示）。ここはその出力の記録であって、編集しても検証には影響しない。")
    L.append("- 追加は自動（`pipeline.py` が `result.md` を書くときに記録する）。"
             "過去分の復元は `python3 pipeline/prompt_log.py --backfill`。")
    L.append("- `reports/_archive_*` は当時の仕様文が現行と異なるため対象外。")
    L.append("")
    L.append("## 索引")
    L.append("")
    L.append("| プロンプト | タスク | 言語 | 例示 | 検証条件数 |")
    L.append("|---|---|---|---|---|")
    total = 0
    for f in files:
        head = open(os.path.join(PROMPT_DIR, f), encoding="utf-8").read()
        def pick(label, default=""):
            m = re.search(rf"^- \*\*{label}\*\*: (.+)$", head, re.M)
            return m.group(1) if m else default
        n = re.search(r"^- \*\*このプロンプトを使った検証\*\*: (\d+) 条件", head, re.M)
        cnt = int(n.group(1)) if n else 0
        total += cnt
        L.append(f"| [`{f}`]({f}) | {pick('タスク').split('（')[0]} | {pick('言語')} | "
                 f"{pick('例示')} | {cnt} |")
    L.append("")
    L.append(f"- プロンプト {len(files)} 種 / 検証 {total} 条件。")
    L.append("")
    with open(os.path.join(PROMPT_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(L))
    return len(files), total


# ------------------------------------------------------------ 過去分の復元 --
META = {
    "task": re.compile(r"^- \*\*タスク\*\*: `([^`]+)`"),
    "lang": re.compile(r"^- \*\*言語\*\*: (\S+)"),
    "shots": re.compile(r"^- \*\*プロンプト\*\*: \S+（例示 (\d+) 件）"),
    "shots_file": re.compile(r"^- \*\*例示セット\*\*: `([^`]+)`"),
    "prompt_set": re.compile(r"^- \*\*プロンプトセット\*\*: `([^`]+)`"),
    "k": re.compile(r"^- \*\*世代数 k\*\*: (\d+)"),
    "temp": re.compile(r"^- \*\*temperature\*\*: (\S+)"),
    "think": re.compile(r"^- \*\*think\*\*: (\S+)"),
}
TITLE = re.compile(r"^# 検証結果: (\S+) / ")


def parse_result(path):
    meta = {}
    for line in open(path, encoding="utf-8"):
        m = TITLE.match(line)
        if m:
            meta["model"] = m.group(1)
        for key, rx in META.items():
            m = rx.match(line)
            if m:
                meta[key] = m.group(1)
        if line.startswith("## 集計"):
            break
    return meta


def backfill(pattern="reports/*/result.md"):
    import datetime
    sys.path.insert(0, os.path.join(REPO, "pipeline"))
    import pipeline as P

    tasks = json.load(open(os.path.join(REPO, "pipeline", "tasks.json"), encoding="utf-8"))
    done, skipped = 0, []
    for path in sorted(glob.glob(os.path.join(REPO, pattern))):
        rel = os.path.relpath(os.path.dirname(path), REPO)
        if "/_archive" in "/" + rel:
            continue
        meta = parse_result(path)
        tname = meta.get("task")
        if tname not in tasks:
            skipped.append((rel, f"未知のタスク {tname}"))
            continue
        shots = int(meta.get("shots", 0))
        shots_file = meta.get("shots_file", "shots.json")
        prompt_set = meta.get("prompt_set", "default")
        prompt = P.build_prompt(tasks[tname], meta["lang"], shots, shots_file, prompt_set)
        run = {"report_dir": rel, "model": meta.get("model", "?"),
               "temp": meta.get("temp", "?"), "k": meta.get("k", "?"),
               "think": meta.get("think", "false"),
               "date": datetime.date.fromtimestamp(os.path.getmtime(path)).isoformat()}
        record(tname, tasks[tname], meta["lang"], shots, prompt, run,
               shots_file, prompt_set, restored=True)
        done += 1
    return done, skipped


def main():
    ap = argparse.ArgumentParser(description="検証で送ったプロンプトを prompt/ に蓄積する")
    ap.add_argument("--backfill", action="store_true",
                    help="reports/ の既存 result.md から過去の検証分を復元する")
    ap.add_argument("--pattern", default="reports/*/result.md")
    args = ap.parse_args()

    if args.backfill:
        done, skipped = backfill(args.pattern)
        print(f"■ 復元した検証: {done} 条件")
        for rel, why in skipped:
            print(f"  スキップ: {rel}（{why}）")
    n, total = write_index()
    print(f"■ prompt/: プロンプト {n} 種 / 検証 {total} 条件  → prompt/README.md")


if __name__ == "__main__":
    main()
