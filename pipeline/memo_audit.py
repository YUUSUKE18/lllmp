import re,glob,os,collections
TRIAL=re.compile(r"^\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([✓✗])\s*\|\s*([✓✗])\s*\|",re.M)
EXT={'go':'go','ts':'ts','java':'java'}
# メモ化テーブルへの「書き込み」らしき行があるか（言語別）
W={'java':re.compile(r"\.put\s*\(|\[\s*\w+\s*\]\s*="),
   'ts':re.compile(r"\.set\s*\(|\[\s*\w+\s*\]\s*="),
   'go':re.compile(r"\w+\s*\[[^\]]+\]\s*=")}
R={'java':re.compile(r"\.containsKey\s*\(|\.get\s*\("),
   'ts':re.compile(r"\.has\s*\(|\.get\s*\(|\bin\b"),
   'go':re.compile(r",\s*ok\s*:?=|\w+\s*\[[^\]]+\]")}
rows=collections.defaultdict(lambda: collections.Counter())
for d in sorted(glob.glob('reports/cwe401_memo_retain_*')):
    b=os.path.basename(d)
    m=re.match(r'^cwe401_memo_retain_(.+)_(go|ts|java)_(\w+)_temp([0-9.]+)(_think)?$',b)
    if not m: continue
    model,lang,shot,t,think=m.groups()
    f=os.path.join(d,'result.md')
    if not os.path.isfile(f): continue
    txt=open(f,encoding='utf-8').read()
    for i,_l,fo,so in TRIAL.findall(txt):
        src=os.path.join(d,'code',f"gen_{int(i):02d}.{EXT[lang]}")
        if not os.path.exists(src): continue
        code=open(src,encoding='utf-8',errors='replace').read()
        writes=len(W[lang].findall(code)); reads=len(R[lang].findall(code))
        key=(model+('_think' if think else ''),lang)
        passed = (fo=='✓' and so=='✓')
        if fo=='✓':
            rows[key]['func']+=1
            if passed:
                rows[key]['func_sec']+=1
                if writes==0: rows[key]['func_sec_nowrite']+=1
            else:
                rows[key]['func_only']+=1
print(f"{'model':28s} {'lang':5s} {'func':>5s} {'func-sec':>9s} {'うち書込0':>9s} {'割合':>6s}")
for k in sorted(rows):
    c=rows[k]; fs=c['func_sec']; nw=c['func_sec_nowrite']
    if not fs: continue
    print(f"{k[0]:28s} {k[1]:5s} {c['func']:5d} {fs:9d} {nw:9d} {100*nw/fs:5.0f}%")
