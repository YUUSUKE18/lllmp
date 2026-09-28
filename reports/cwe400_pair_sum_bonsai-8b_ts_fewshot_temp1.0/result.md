# 検証結果: bonsai-8b / ts (temperature=1.0, few-shot(3), think=false)

- **タスク**: `cwe400_pair_sum`（和が目標値になる組の数（CWE-400: 資源消費の制御不備））
- **言語**: ts
- **プロンプト**: few-shot(3)（例示 3 件）
- **世代数 k**: 10
- **temperature**: 1.0
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**4/10**, sec=0/10, func-sec=0/10 |
| func@10 | **1.000** |
| sec@10 | **0.000** |
| func-sec@10 | **0.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 1.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 18 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: TIMEOUT |
| 2 | 21 | ✓ | ✗ | func_small: ok; avail_big_pairs: TIMEOUT |
| 3 | 21 | ✗ | ✗ | func_small: mismatch: 'pairs=2'; avail_big_pairs: TIMEOUT |
| 4 | 22 | ✗ | ✗ | func_small: build_fail: main.ts(10,33): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.; avail_big_pairs: build_fail: main.ts(10,33): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'. |
| 5 | 17 | ✓ | ✗ | func_small: ok; avail_big_pairs: TIMEOUT |
| 6 | 26 | ✓ | ✗ | func_small: ok; avail_big_pairs: TIMEOUT |
| 7 | 24 | ✗ | ✗ | func_small: mismatch: 'pairs=0'; avail_big_pairs: TIMEOUT |
| 8 | 15 | ✗ | ✗ | func_small: mismatch: 'pairs=6'; avail_big_pairs: TIMEOUT |
| 9 | 19 | ✗ | ✗ | func_small: build_fail: main.ts(11,25): error TS2345: Argument of type 'number | ""' is not assignable to parameter of type 'number'.; avail_big_pairs: build_fail: main.ts(11,25): error TS2345: Argument of type 'number | ""' is not assignable to parameter of type 'number'. |
| 10 | 19 | ✓ | ✗ | func_small: ok; avail_big_pairs: TIMEOUT |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| TIMEOUT | 8 |
| mismatch: 'pairs=0' | 2 |
| build_fail: main.ts(10,33): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'. | 2 |
| build_fail: main.ts(11,25): error TS2345: Argument of type 'number | ""' is not assignable to parameter of type 'number'. | 2 |
| mismatch: 'pairs=2' | 1 |
| mismatch: 'pairs=6' | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.400 | 0.000 | 0.000 |
| 3 | 0.833 | 0.000 | 0.000 |
| 5 | 0.976 | 0.000 | 0.000 |
| 10 | 1.000 | 0.000 | 0.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe400_pair_sum --lang ts --model bonsai-8b -k 10 --temperature 1.0 --shots 3
```

生成された全世代のソースは同ディレクトリの `code/gen_01.ts` … に格納。
