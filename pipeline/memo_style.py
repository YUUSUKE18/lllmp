# -*- coding: utf-8 -*-
"""メモ化の様式をヒューリスティックに分類する: 再帰メモ化 / 経路保持 / その他。"""
import re, sys
def strip_noise(s):
    s=re.sub(r'//[^\n]*','',s); s=re.sub(r'/\*.*?\*/','',s,flags=re.S)
    return s
FUNC=re.compile(r'\b(?:func|function)\s+(\w+)|\b(?:static|private|public)[\w<>,\[\] ]*?\s(\w+)\s*\(')
def classify(src):
    s=strip_noise(src)
    memo_write=bool(re.search(r'\w*(memo|cache|seen|map)\w*\s*(\.\s*(put|set)\s*\(|\[[^\]]+\]\s*=)',s,re.I))
    # 自己再帰の検出
    rec=False
    for m in FUNC.finditer(s):
        name=m.group(1) or m.group(2)
        if not name or name in ("main","if","for","while","switch","catch"): continue
        j=s.find('{',m.end())
        if j<0: continue
        depth=0
        for k in range(j,len(s)):
            if s[k]=='{': depth+=1
            elif s[k]=='}':
                depth-=1
                if depth==0:
                    body=s[j+1:k]; break
        else: continue
        if re.search(r'\b'+re.escape(name)+r'\s*\(',body):
            rec=True
            if re.search(r'\w*(memo|cache)\w*\s*(\.\s*(put|set)\s*\(|\[[^\]]+\]\s*=)',body,re.I):
                return "再帰メモ化"
    path=bool(re.search(r'\b(path|seq|chain|trail|history)\w*\s*(\.\s*(push|add|append)|\[)',s,re.I))
    if path and memo_write: return "経路保持メモ化"
    if rec: return "再帰(メモ書き込み外)"
    return "その他"


if __name__ == "__main__":
    import glob, os, collections
    pat = sys.argv[1] if len(sys.argv) > 1 else "reports/cwe401_memo_retain_*"
    trial = re.compile(r"^\|\s*(\d+)\s*\|.*?\|\s*([✓✗])\s*\|\s*([✓✗])\s*\|\s*(.*?)\s*\|$")
    ext = {"go": "go", "ts": "ts", "java": "java"}
    tab = collections.Counter()
    for d in sorted(glob.glob(pat)):
        name = os.path.basename(d)
        langs = [l for l in ext if f"_{l}_" in name]
        if not langs:
            continue
        lang = langs[0]
        rp = os.path.join(d, "result.md")
        if not os.path.exists(rp):
            continue
        for line in open(rp, encoding="utf-8"):
            m = trial.match(line.strip())
            # func 通過 & sec 失敗（＝ギャップ世代）だけを分類する
            if not m or m.group(2) != "✓" or m.group(3) == "✓":
                continue
            cause = [p.split(": ", 1)[1] for p in m.group(4).split("; ") if p.startswith("avail")]
            cause = cause[0] if cause else "?"
            kind = ("メモリ由来" if ("crash" in cause or cause.startswith("rss") or cause == "OOM")
                    else "誤答" if cause.startswith("wrong") else cause.split(":")[0])
            f = os.path.join(d, "code", f"gen_{int(m.group(1)):02d}.{ext[lang]}")
            if not os.path.exists(f):
                continue
            tab[(kind, lang, classify(open(f, encoding="utf-8", errors="replace").read()))] += 1
    for k in sorted(tab):
        print(f"{k[0]:8s} {k[1]:5s} {k[2]:16s} {tab[k]}")
    print("合計:", sum(tab.values()))
