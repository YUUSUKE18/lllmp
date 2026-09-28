#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""reports/<model>_<lang>_temp<t>[...]/result.md 群を読み、
温度×言語の func-sec 合格数ヒートマップと func<sec 乖離表を SUMMARY に出力する。

使い方:
  python3 pipeline/summarize.py --model 'qwen3.5:4b' --out reports/SUMMARY_qwen3.5_4b.md
"""
import argparse
import glob
import os
import re

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGS = ["go", "ts", "java"]
TEMPS = ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"]


def parse_counts(path):
    """result.md の集計行から func/sec/func-sec 合格数と n を取る。"""
    try:
        txt = open(path, encoding="utf-8").read()
    except FileNotFoundError:
        return None
    m = re.search(r"func=\*\*(\d+)/(\d+)\*\*, sec=(\d+)/\d+, func-sec=(\d+)/\d+", txt)
    if not m:
        return None
    func, n, sec, fs = (int(m.group(i)) for i in (1, 2, 3, 4))
    return {"func": func, "sec": sec, "fs": fs, "n": n}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True, help="例: qwen3.5:4b")
    ap.add_argument("--suffix", default="", help="think 版なら _think 等")
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    grid = {}  # (lang,temp) -> counts
    for lang in LANGS:
        for t in TEMPS:
            d = os.path.join(REPO, "reports", f"{args.model}_{lang}_temp{t}{args.suffix}")
            grid[(lang, t)] = parse_counts(os.path.join(d, "result.md"))

    L = []
    L.append(f"# {args.model} 温度スイープ 総括（go / ts / java × temp 0.1–1.0, k=10）")
    L.append("")
    L.append(f"- **モデル**: {args.model}（think={'true' if args.suffix else 'false'}）")
    L.append("- **タスク**: `cwe400_unique`（重複除去 / CWE-400 資源消費の制御不備）")
    L.append(f"- 個別結果は `reports/{args.model}_<lang>_temp<t>{args.suffix}/result.md`、生成コードは同 `code/`。")
    L.append("")
    L.append("## func-sec 合格数（/10）ヒートマップ")
    L.append("")
    L.append("| temp | go | ts | java |")
    L.append("|---|---|---|---|")
    sums = {lang: 0 for lang in LANGS}
    cnts = {lang: 0 for lang in LANGS}
    for t in TEMPS:
        cells = []
        for lang in LANGS:
            c = grid[(lang, t)]
            if c is None:
                cells.append("–")
            else:
                cells.append(str(c["fs"]))
                sums[lang] += c["fs"]
                cnts[lang] += 1
        L.append(f"| {t} | {cells[0]} | {cells[1]} | {cells[2]} |")
    avg = [f"{sums[l]/cnts[l]:.1f}" if cnts[l] else "–" for l in LANGS]
    L.append(f"| **平均** | **{avg[0]}** | **{avg[1]}** | **{avg[2]}** |")
    L.append("")
    L.append("## func と sec の乖離（func < sec の条件のみ）")
    L.append("")
    L.append("func-sec 低下が機能バグ由来か資源枯渇(sec)由来かの切り分け。")
    L.append("")
    rows = []
    for lang in LANGS:
        for t in TEMPS:
            c = grid[(lang, t)]
            if c and c["func"] < c["sec"]:
                rows.append(f"| {lang} temp{t} | {c['func']} | {c['sec']} | 機能不一致 {c['sec']-c['func']} 件（sec は通過）|")
    if rows:
        L.append("| 条件 | func | sec | 差分の正体 |")
        L.append("|---|---|---|---|")
        L.extend(rows)
    else:
        L.append("該当なし（全条件で func = sec、または func > sec）。")
    L.append("")
    L.append("## セキュリティギャップ")
    L.append("")
    any_sec_fail = any(c and c["sec"] < c["func"] for c in grid.values())
    L.append("- 全条件で func ≤ sec の場合、func-sec 低下は機能不一致由来であり "
             "**sec（O(n²) 等の資源枯渇＝CWE-400 本体）由来の失敗はゼロ**。" if not any_sec_fail
             else "- 一部条件で sec < func が観測され、資源枯渇由来の失敗が存在する（該当 result.md 参照）。")
    L.append("")
    with open(args.out, "w", encoding="utf-8") as f:
        f.write("\n".join(L))
    print(f"wrote {args.out}")


if __name__ == "__main__":
    main()
