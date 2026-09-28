#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""think あり/なしの同条件対比表を作る。

`reports/<task>_<model>_<lang>_<shot>_temp<t>_think/` と、_think を外した同名ディレクトリを
突き合わせ、func / sec / func-sec を並べる。think アームは条件数が少ないので、
存在する _think 条件だけを対象にする。

使い方: python3 pipeline/think_compare.py [--model qwen3.5:4b]
"""
import argparse, glob, os, re, sys

R = re.compile(r"func=\*\*(\d+)/(\d+)\*\*, sec=(\d+)/\d+, func-sec=(\d+)/\d+")


def read(d):
    f = os.path.join(d, "result.md")
    if not os.path.isfile(f):
        return None
    m = R.search(open(f, encoding="utf-8").read())
    if not m:
        return None
    a, n, s, c = map(int, m.groups())
    return dict(n=n, func=a, sec=s, both=c)


def empty_outputs(d):
    """応答が空(1バイト)だった世代数。thinking が予算を使い切った回数の目安。"""
    cd = os.path.join(d, "code")
    if not os.path.isdir(cd):
        return None
    return sum(os.path.getsize(os.path.join(cd, f)) <= 2 for f in os.listdir(cd))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="qwen3.5:4b")
    args = ap.parse_args()

    # cwe400_unique だけはタスク名を前置しない平坦名（取得済み36条件の流儀）なので別に拾う。
    dirs = sorted(set(glob.glob(f"reports/*_{args.model}_*_think"))
                  | set(glob.glob(f"reports/{args.model}_*_think")))
    if not dirs:
        sys.exit(f"_think の条件がありません: model={args.model}")

    print(f"# think あり/なし 同条件対比 ({args.model})\n")
    print("| タスク | 言語 | 例示 | temp | think | func | sec | func-sec | 空応答 |")
    print("|---|---|---|---|---|---|---|---|---|")
    tot = {True: [0, 0, 0, 0], False: [0, 0, 0, 0]}
    for td in dirs:
        base = td[: -len("_think")]
        b = os.path.basename(base)
        m = re.match(rf"^(.*)_{re.escape(args.model)}_(go|ts|java)_(\w+)_temp([0-9.]+)$", b)
        if m:
            task, lang, shot, t = m.groups()
        else:
            m = re.match(rf"^{re.escape(args.model)}_(go|ts|java)_(\w+)_temp([0-9.]+)$", b)
            if not m:
                continue
            lang, shot, t = m.groups()
            task = "cwe400_unique"  # 平坦名は既定タスク
        for on, d in ((False, base), (True, td)):
            r = read(d)
            if not r:
                print(f"| {task} | {lang} | {shot} | {t} | {'ON' if on else 'OFF'} | (未取得) | | | |")
                continue
            e = empty_outputs(d)
            a = tot[on]
            a[0] += r["n"]; a[1] += r["func"]; a[2] += r["sec"]; a[3] += r["both"]
            print(f"| {task} | {lang} | {shot} | {t} | {'**ON**' if on else 'OFF'} | "
                  f"{r['func']}/{r['n']} | {r['sec']}/{r['n']} | "
                  f"{'**' if on else ''}{r['both']}/{r['n']}{'**' if on else ''} | "
                  f"{e if e is not None else '-'} |")
    print()
    print("| think | func | sec | func-sec |")
    print("|---|---|---|---|")
    for on in (False, True):
        n, f_, s, b = tot[on]
        if not n:
            continue
        print(f"| {'**ON**' if on else 'OFF'} | {f_}/{n} ({100*f_/n:.0f}%) | "
              f"{s}/{n} ({100*s/n:.0f}%) | {b}/{n} ({100*b/n:.0f}%) |")


if __name__ == "__main__":
    main()
