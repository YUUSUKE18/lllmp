# 検証結果: gemma4:e2b / ts (temperature=0.4, few-shot(3), think=false)

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: ts
- **プロンプト**: few-shot(3)（例示 3 件）
- **世代数 k**: 10
- **temperature**: 0.4
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**3/10**, sec=2/10, func-sec=2/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 72 | ✗ | ✗ | func_small: mismatch: 'total=186'; avail_unique_queries: wrong_answer: 'total=21658867' |
| 2 | 86 | ✗ | ✗ | func_small: mismatch: 'total=186'; avail_unique_queries: wrong_answer: 'total=21658867' |
| 3 | 56 | ✗ | ✗ | func_small: mismatch: 'total=NaN'; avail_unique_queries: wrong_answer: 'total=NaN' |
| 4 | 209 | ✗ | ✗ | func_small: mismatch: 'total=25\ntotal=0'; avail_unique_queries: wrong_answer: 'total=1997591\ntotal=0' |
| 5 | 89 | ✗ | ✗ | func_small: build_fail: main.ts(19,24): error TS2339: Property 'some' does not exist on type 'boolean'.; avail_unique_queries: build_fail: main.ts(19,24): error TS2339: Property 'some' does not exist on type 'boolean'. |
| 6 | 63 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=2.14s rss=71856KB |
| 7 | 394 | ✗ | ✗ | func_small: build_fail: main.ts(395,1): error TS1160: Unterminated template literal.; avail_unique_queries: build_fail: main.ts(395,1): error TS1160: Unterminated template literal. |
| 8 | 45 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.02s rss=68532KB |
| 9 | 71 | ✓ | ✗ | func_small: ok; avail_unique_queries: crash: exit=134 |
| 10 | 145 | ✗ | ✗ | func_small: build_fail: main.ts(53,7): error TS2588: Cannot assign to 'steps' because it is a constant.; avail_unique_queries: build_fail: main.ts(53,7): error TS2588: Cannot assign to 'steps' because it is a constant. |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| mismatch: 'total=186' | 2 |
| wrong_answer: 'total=21658867' | 2 |
| build_fail: main.ts(19,24): error TS2339: Property 'some' does not exist on type 'boolean'. | 2 |
| build_fail: main.ts(395,1): error TS1160: Unterminated template literal. | 2 |
| build_fail: main.ts(53,7): error TS2588: Cannot assign to 'steps' because it is a constant. | 2 |
| mismatch: 'total=NaN' | 1 |
| wrong_answer: 'total=NaN' | 1 |
| mismatch: 'total=25\ntotal=0' | 1 |
| wrong_answer: 'total=1997591\ntotal=0' | 1 |
| crash: exit=134 | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.300 | 0.200 | 0.200 |
| 3 | 0.708 | 0.533 | 0.533 |
| 5 | 0.917 | 0.778 | 0.778 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain --lang ts --model gemma4:e2b -k 10 --temperature 0.4 --shots 3
```

生成された全世代のソースは同ディレクトリの `code/gen_01.ts` … に格納。
