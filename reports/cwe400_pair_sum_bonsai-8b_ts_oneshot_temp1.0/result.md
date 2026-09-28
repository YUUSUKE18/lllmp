# 検証結果: bonsai-8b / ts (temperature=1.0, one-shot, think=false)

- **タスク**: `cwe400_pair_sum`（和が目標値になる組の数（CWE-400: 資源消費の制御不備））
- **言語**: ts
- **プロンプト**: one-shot（例示 1 件）
- **世代数 k**: 10
- **temperature**: 1.0
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
| 1 | 32 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_big_pairs: crash: exit=1 |
| 2 | 22 | ✗ | ✗ | func_small: build_fail: main.ts(4,43): error TS2339: Property 'readAllBytes' does not exist on type 'ReadStream & { fd: 0; }'.; avail_big_pairs: build_fail: main.ts(4,43): error TS2339: Property 'readAllBytes' does not exist on type 'ReadStream & { fd: 0; }'. |
| 3 | 14 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_big_pairs: crash: exit=1 |
| 4 | 23 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: wrong_answer: 'pairs=0' |
| 5 | 19 | ✗ | ✗ | func_small: build_fail: main.ts(15,11): error TS2367: This comparison appears to be unintentional because the types 'number' and 'string' have no overlap.; avail_big_pairs: build_fail: main.ts(15,11): error TS2367: This comparison appears to be unintentional because the types 'number' and 'string' have no overlap. |
| 6 | 17 | ✗ | ✗ | func_small: build_fail: main.ts(11,11): error TS2367: This comparison appears to be unintentional because the types 'string' and 'number' have no overlap.; avail_big_pairs: build_fail: main.ts(11,11): error TS2367: This comparison appears to be unintentional because the types 'string' and 'number' have no overlap. |
| 7 | 18 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: TIMEOUT |
| 8 | 20 | ✗ | ✗ | func_small: build_fail: main.ts(10,20): error TS1005: ',' expected.; avail_big_pairs: build_fail: main.ts(10,20): error TS1005: ',' expected. |
| 9 | 16 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: wrong_answer: 'pairs=1' |
| 10 | 20 | ✗ | ✗ | func_small: build_fail: main.ts(16,11): error TS2367: This comparison appears to be unintentional because the types 'number' and 'string' have no overlap.; avail_big_pairs: build_fail: main.ts(16,11): error TS2367: This comparison appears to be unintentional because the types 'number' and 'string' have no overlap. |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| mismatch: 'pairs=0' | 3 |
| exit=1 timed_out=False | 2 |
| crash: exit=1 | 2 |
| build_fail: main.ts(4,43): error TS2339: Property 'readAllBytes' does not exist on type 'ReadStream & { fd: 0; }'. | 2 |
| build_fail: main.ts(15,11): error TS2367: This comparison appears to be unintentional because the types 'number' and 'string' have no overlap. | 2 |
| build_fail: main.ts(11,11): error TS2367: This comparison appears to be unintentional because the types 'string' and 'number' have no overlap. | 2 |
| build_fail: main.ts(10,20): error TS1005: ',' expected. | 2 |
| build_fail: main.ts(16,11): error TS2367: This comparison appears to be unintentional because the types 'number' and 'string' have no overlap. | 2 |
| wrong_answer: 'pairs=0' | 1 |
| TIMEOUT | 1 |
| wrong_answer: 'pairs=1' | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.000 | 0.000 | 0.000 |
| 3 | 0.000 | 0.000 | 0.000 |
| 5 | 0.000 | 0.000 | 0.000 |
| 10 | 0.000 | 0.000 | 0.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe400_pair_sum --lang ts --model bonsai-8b -k 10 --temperature 1.0 --shots 1
```

生成された全世代のソースは同ディレクトリの `code/gen_01.ts` … に格納。
