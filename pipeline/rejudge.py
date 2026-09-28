#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""保存済みの生成コードを *現行の判定関数* で採点し直す。

取得時期の違う結果を横並びで論じてよいかを確かめるための道具。
`pipeline.py` の判定（judge_functional / judge_availability）と実行経路（run_case）を
そのまま import して使うので、「今の基準ならどう出るか」が定義上ずれない。

使い方:
  # 差分だけ見る（result.md は書き換えない）
  python3 pipeline/rejudge.py --task cwe400_pair_sum 'reports/cwe400_pair_sum_gemma4:e2b_*'

  # 各条件から3世代だけ抜き取って照合する（全部回すと時間がかかるため）
  python3 pipeline/rejudge.py --task cwe400_pair_sum --sample 3 'reports/...*'

  # 判定が変わっていた場合に result.md を現行判定で書き直す
  python3 pipeline/rejudge.py --task cwe400_pair_sum --write 'reports/...*'

終了コード: 0 = 差分なし / 1 = 差分あり / 2 = 環境エラー(Docker 不達)
"""
import argparse
import glob
import importlib.util
import json
import os
import random
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

_spec = importlib.util.spec_from_file_location("_pl", os.path.join(REPO, "pipeline", "pipeline.py"))
pl = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(pl)

TRIAL_RE = re.compile(r"^\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([✓✗])\s*\|\s*([✓✗])\s*\|\s*(.*?)\s*\|$")


def parse_trials(result_md):
    """result.md の試行表から {世代番号: (func, sec, 詳細)} を取る。"""
    out = {}
    for line in open(result_md, encoding="utf-8"):
        m = TRIAL_RE.match(line.strip())
        if m:
            out[int(m.group(1))] = (m.group(3) == "✓", m.group(4) == "✓", m.group(5))
    return out


def lang_of(dirname):
    for l in ("go", "ts", "java"):
        if f"_{l}_" in dirname:
            return l
    return None


def rejudge_dir(d, task, sample=0, seed=0):
    """1条件分を再採点し、(記録, 差分リスト) を返す。"""
    lang = lang_of(os.path.basename(d))
    if lang is None:
        return None, []
    ext = pl.LANGS[lang]["filename"].split(".")[-1]
    old = parse_trials(os.path.join(d, "result.md"))

    idxs = sorted(old)
    if sample and len(idxs) > sample:
        idxs = sorted(random.Random(seed).sample(idxs, sample))

    records, diffs = [], []
    for i in idxs:
        src = os.path.join(d, "code", f"gen_{i:02d}.{ext}")
        if not os.path.exists(src):
            continue
        code = open(src, encoding="utf-8", errors="replace").read()

        f_ok = s_ok = True
        cases = []
        for case in task["testcases"]:
            res = pl.run_case(lang, code, case)   # DockerUnavailable はそのまま上へ投げる
            if case["kind"] == "functional":
                ok, why = pl.judge_functional(res, case)
                f_ok = f_ok and ok
            else:
                ok, why = pl.judge_availability(res, case)
                s_ok = s_ok and ok
            cases.append({"label": case["label"], "kind": case["kind"], "ok": ok, "why": why})

        records.append({"i": i, "code": code, "lines": len(code.splitlines()),
                        "func": bool(f_ok), "sec": bool(s_ok), "both": bool(f_ok and s_ok),
                        "cases": cases})
        of, os_, odetail = old[i]
        if (of, os_) != (bool(f_ok), bool(s_ok)):
            diffs.append({"dir": d, "i": i,
                          "old": (of, os_), "new": (bool(f_ok), bool(s_ok)),
                          "old_detail": odetail,
                          "new_detail": "; ".join(f"{c['label']}: {c['why']}" for c in cases)})
    return records, diffs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pattern", help="レポートディレクトリの glob（要クォート）")
    ap.add_argument("--task", required=True, help="採点に使うタスク定義名")
    ap.add_argument("--sample", type=int, default=0,
                    help="各条件から抜き取る世代数（0=全世代）")
    ap.add_argument("--seed", type=int, default=0, help="--sample の抽出シード")
    ap.add_argument("--write", action="store_true",
                    help="現行判定で result.md を書き直す（--sample とは併用不可）")
    args = ap.parse_args()

    if args.write and args.sample:
        sys.exit("--write と --sample は併用できません（部分採点でレポートを壊さないため）")

    tasks = json.load(open(os.path.join(REPO, "pipeline", "tasks.json")))
    if args.task not in tasks:
        sys.exit(f"未知のタスク: {args.task}（候補: {', '.join(tasks)}）")
    task = tasks[args.task]

    dirs = [d for d in sorted(glob.glob(args.pattern))
            if os.path.isfile(os.path.join(d, "result.md"))]
    if not dirs:
        sys.exit(f"該当するレポートがありません: {args.pattern}")

    pl.ensure_docker()
    print(f"■ 再採点: task={args.task} 条件数={len(dirs)}"
          + (f" 各条件から {args.sample} 世代を抽出" if args.sample else " 全世代"))

    all_diffs, checked = [], 0
    for d in dirs:
        try:
            records, diffs = rejudge_dir(d, task, args.sample, args.seed)
        except pl.DockerUnavailable as e:
            print(f"\n■ 中断: Docker ランナーが結果を返しませんでした（{d}）", file=sys.stderr)
            print(f"  {str(e).splitlines()[0]}", file=sys.stderr)
            sys.exit(pl.EXIT_ENV_ERROR)
        if records is None:
            continue
        checked += len(records)
        all_diffs += diffs
        mark = "✓ 一致" if not diffs else f"✗ 差分 {len(diffs)} 件"
        print(f"  {mark:12s} {os.path.basename(d)}")

        if args.write and diffs:
            lang = lang_of(os.path.basename(d))
            ext = pl.LANGS[lang]["filename"].split(".")[-1]
            meta = {"model": "(rejudged)", "lang": lang, "langflag": lang,
                    "temp": "-", "think": False, "n": len(records),
                    "shots": 0, "shots_file": pl.DEFAULT_SHOTS_FILE,
                    "task": args.task, "title": task["title"]}
            pl.write_report(d, meta, records, ext)

    print(f"\n═══ 結果 ═══\n  照合世代数: {checked}  判定が変わった世代: {len(all_diffs)}")
    for x in all_diffs:
        o = f"func={'✓' if x['old'][0] else '✗'} sec={'✓' if x['old'][1] else '✗'}"
        n = f"func={'✓' if x['new'][0] else '✗'} sec={'✓' if x['new'][1] else '✗'}"
        print(f"\n  {os.path.basename(x['dir'])} gen_{x['i']:02d}: {o}  →  {n}")
        print(f"    旧: {x['old_detail'][:150]}")
        print(f"    新: {x['new_detail'][:150]}")
    if not all_diffs:
        print("  → 現行判定でも当時と同じ結果。取得時期をまたいだ比較は妥当。")
    sys.exit(1 if all_diffs else 0)


if __name__ == "__main__":
    main()
