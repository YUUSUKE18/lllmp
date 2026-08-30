# -*- coding: utf-8 -*-
"""生成コードを静的に見て「二重ループ(O(n^2))か / ハッシュ表で1パスか」を分類する。
go/ts/java いずれも波括弧なので、for/while トークンからブロックを取り、
その内側に別のループがあれば nested と判定する。"""
import re, sys, glob, os, collections

LOOP = re.compile(r'\b(for|while)\b')

def strip_noise(src):
    src = re.sub(r'//[^\n]*', '', src)
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    src = re.sub(r'"(?:\\.|[^"\\])*"', '""', src)
    src = re.sub(r"'(?:\\.|[^'\\])*'", "''", src)
    src = re.sub(r'`(?:\\.|[^`\\])*`', '``', src)
    return src

def block_of(src, i):
    """位置 i のループの本体 {...} を返す（見つからなければ None）。"""
    j = src.find('{', i)
    if j < 0: return None
    depth = 0
    for k in range(j, len(src)):
        if src[k] == '{': depth += 1
        elif src[k] == '}':
            depth -= 1
            if depth == 0: return src[j+1:k]
    return None

def has_nested_loop(src):
    src = strip_noise(src)
    for m in LOOP.finditer(src):
        body = block_of(src, m.end())
        if body and LOOP.search(body):
            return True
    return False

def uses_hash(src):
    s = strip_noise(src)
    # TS はジェネリクス付き（new Map<number, number>()）を書くので型引数を許容する。
    return bool(re.search(r'\bmap\[|\bnew\s+(Map|Set)\s*(<[^>{}]*>)?\s*\(|HashMap|HashSet|'
                          r'\{\}\s*as\s*Record|Object\.create\(null\)', s))

def classify(src):
    n, h = has_nested_loop(src), uses_hash(src)
    if n and not h: return "nested_loop"
    if n and h:     return "nested+hash"
    if h:           return "hash_1pass"
    return "other"

if __name__ == "__main__":
    pat = sys.argv[1]
    trial_re = re.compile(r"^\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([✓✗])\s*\|\s*([✓✗])\s*\|\s*(.*?)\s*\|$")
    ext = {"go": "go", "ts": "ts", "java": "java"}
    tab = collections.Counter()
    for d in sorted(glob.glob(pat)):
        name = os.path.basename(d)
        lang = [l for l in ("go", "ts", "java") if f"_{l}_" in name][0]
        txt = open(os.path.join(d, "result.md"), encoding="utf-8").read()
        for line in txt.splitlines():
            mm = trial_re.match(line.strip())
            if not mm: continue
            idx = int(mm.group(1)); det = mm.group(5)
            avail = "?"
            for part in det.split("; "):
                if part.startswith("avail"):
                    r = part.split(": ", 1)[1].strip()
                    avail = "ok" if r.startswith("wall=") else r.split(":")[0].strip()
            f = os.path.join(d, "code", f"gen_{idx:02d}.{ext[lang]}")
            if not os.path.exists(f): continue
            tab[(lang, avail, classify(open(f, encoding="utf-8", errors="replace").read()))] += 1
    for k in sorted(tab, key=lambda x: (x[0], x[1], -tab[x])):
        print(f"{k[0]:5s} avail={k[1]:12s} {k[2]:12s} {tab[k]}")
