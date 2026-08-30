#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""タスクを本番投入する前に「素朴実装が確実に落ち、安全実装が確実に通る」ことを確認する。

CWE-400 で func-sec ギャップが一度も立たなかった反省から導入した手順。
`pipeline/ref/<task>/{naive,secure}.{go,ts,java}` の参照実装を、実タスク定義・実判定関数に
そのまま流し、6通り（3言語 × naive/secure）の結果を表で出す。

合格条件（--gate 指定時は exit code に反映）:
  - secure: 全ケース ✓（func も sec も通る）
  - naive : func は ✓、sec は ✗（＝機能は正しいが安全でない＝狙った func-sec ギャップ）

使い方:
  python3 pipeline/calibrate.py --task cwe770_rle_expand
  python3 pipeline/calibrate.py --task cwe770_rle_expand --langs go --impls naive
  python3 pipeline/calibrate.py --task cwe770_rle_expand --gate
"""
import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import pipeline as P  # noqa: E402

EXT = {"go": "go", "ts": "ts", "java": "java"}


def ref_path(task, impl, lang):
    return os.path.join(P.REPO, "pipeline", "ref", task, f"{impl}.{EXT[lang]}")


def run_impl(task_def, task, impl, lang):
    """参照実装を全テストケースに流し、[(label, kind, ok, reason)] を返す。"""
    path = ref_path(task, impl, lang)
    if not os.path.exists(path):
        return None
    code = open(path, encoding="utf-8").read()
    out = []
    for case in task_def["testcases"]:
        res = P.run_case(lang, code, case)
        judge = P.judge_functional if case["kind"] == "functional" else P.judge_availability
        ok, reason = judge(res, case)
        out.append((case["label"], case["kind"], ok, reason))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--task", required=True)
    ap.add_argument("--langs", default="go,ts,java")
    ap.add_argument("--impls", default="naive,secure")
    ap.add_argument("--gate", action="store_true",
                    help="較正条件を満たさなければ exit 1（本番投入前のゲートとして使う）")
    args = ap.parse_args()

    P.ensure_docker()
    tasks = json.load(open(os.path.join(P.REPO, "pipeline", "tasks.json")))
    if args.task not in tasks:
        sys.exit(f"未知のタスク: {args.task}（定義済み: {', '.join(tasks)}）")
    task_def = tasks[args.task]

    langs = [l for l in args.langs.split(",") if l]
    impls = [i for i in args.impls.split(",") if i]

    print(f"# 較正: {args.task} — {task_def['title']}")
    for c in task_def["testcases"]:
        lim = f", rss_limit={c['rss_limit_kb']}KB" if c.get("rss_limit_kb") else ""
        print(f"  - {c['label']} ({c['kind']}): timeout={c['timeout_s']}s{lim}")
    print()

    rows, violations = [], []
    for lang in langs:
        for impl in impls:
            got = run_impl(task_def, args.task, impl, lang)
            if got is None:
                print(f"… skip {lang}/{impl}（参照実装が無い: {ref_path(args.task, impl, lang)}）",
                      file=sys.stderr)
                continue
            for label, kind, ok, reason in got:
                rows.append((lang, impl, label, kind, ok, reason))
                print(f"{lang:5} {impl:7} {label:20} {'✓' if ok else '✗'}  {reason}")
                # 較正条件: secure は全通過、naive は func 通過 / sec 不合格。
                # ただし言語仕様上 naive が安全になる場合（例: Go の regexp は RE2 で
                # ReDoS が成立しない）は、タスク定義の calibration.naive_sec_pass_langs で
                # 例外として宣言しておく。これ自体が観測対象なので NG 扱いにしない。
                immune = task_def.get("calibration", {}).get("naive_sec_pass_langs", [])
                want = True if (impl == "secure" or kind == "functional") else (lang in immune)
                if ok != want:
                    violations.append(
                        f"{lang}/{impl}/{label}: {'✓' if ok else '✗'} だが期待は "
                        f"{'✓' if want else '✗'}（{reason}）")

    print()
    if violations:
        print("## 較正 NG — このままでは狙った func-sec ギャップを観測できない")
        for v in violations:
            print(f"  - {v}")
    else:
        immune = task_def.get("calibration", {}).get("naive_sec_pass_langs", [])
        if immune:
            print(f"## 較正 OK — 宣言済みの免疫言語 ({', '.join(immune)}) を除き、"
                  "「func は通るが sec が落ちる」が成立している")
            why = task_def.get("calibration", {}).get("why")
            if why:
                print(f"   免疫の理由: {why}")
        else:
            print("## 較正 OK — 全言語で「func は通るが sec が落ちる」が成立している")

    if args.gate and violations:
        sys.exit(1)


if __name__ == "__main__":
    main()
