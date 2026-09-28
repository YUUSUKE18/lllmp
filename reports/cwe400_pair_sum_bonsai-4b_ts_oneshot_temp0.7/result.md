# 検証結果: bonsai-4b / ts (temperature=0.7, one-shot, think=false)

- **タスク**: `cwe400_pair_sum`（和が目標値になる組の数（CWE-400: 資源消費の制御不備））
- **言語**: ts
- **プロンプト**: one-shot（例示 1 件）
- **世代数 k**: 10
- **temperature**: 0.7
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**0/10**, sec=0/10, func-sec=0/10 |
| func@10 | **0.000** |
| sec@10 | **0.000** |
| func-sec@10 | **0.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 14 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: wrong_answer: 'pairs=1' |
| 2 | 38 | ✗ | ✗ | func_small: build_fail: main.ts(1,39): error TS2339: Property 'readline' does not exist on type 'ReadStream & { fd: 0; }'.; avail_big_pairs: build_fail: main.ts(1,39): error TS2339: Property 'readline' does not exist on type 'ReadStream & { fd: 0; }'. |
| 3 | 19 | ✗ | ✗ | func_small: build_fail: main.ts(5,39): error TS2339: Property 'readline' does not exist on type 'ReadStream & { fd: 0; }'.; avail_big_pairs: build_fail: main.ts(5,39): error TS2339: Property 'readline' does not exist on type 'ReadStream & { fd: 0; }'. |
| 4 | 16 | ✗ | ✗ | func_small: build_fail: main.ts(5,39): error TS2339: Property 'readline' does not exist on type 'ReadStream & { fd: 0; }'.; avail_big_pairs: build_fail: main.ts(5,39): error TS2339: Property 'readline' does not exist on type 'ReadStream & { fd: 0; }'. |
| 5 | 16 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: wrong_answer: 'pairs=0' |
| 6 | 16 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: wrong_answer: 'pairs=1' |
| 7 | 19 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_big_pairs: crash: exit=1 |
| 8 | 17 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: wrong_answer: 'pairs=1' |
| 9 | 16 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: crash: exit=1 |
| 10 | 16 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: wrong_answer: 'pairs=1' |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| mismatch: 'pairs=0' | 6 |
| wrong_answer: 'pairs=1' | 4 |
| build_fail: main.ts(5,39): error TS2339: Property 'readline' does not exist on type 'ReadStream & { fd: 0; }'. | 4 |
| build_fail: main.ts(1,39): error TS2339: Property 'readline' does not exist on type 'ReadStream & { fd: 0; }'. | 2 |
| crash: exit=1 | 2 |
| wrong_answer: 'pairs=0' | 1 |
| exit=1 timed_out=False | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.000 | 0.000 | 0.000 |
| 3 | 0.000 | 0.000 | 0.000 |
| 5 | 0.000 | 0.000 | 0.000 |
| 10 | 0.000 | 0.000 | 0.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe400_pair_sum --lang ts --model bonsai-4b -k 10 --temperature 0.7 --shots 1
```

生成された全世代のソースは同ディレクトリの `code/gen_01.ts` … に格納。
