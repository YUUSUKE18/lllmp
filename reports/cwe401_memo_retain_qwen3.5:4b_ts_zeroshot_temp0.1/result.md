# 検証結果: qwen3.5:4b / ts (temperature=0.1, zero-shot, think=false)

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: ts
- **プロンプト**: zero-shot（例示 0 件）
- **世代数 k**: 10
- **temperature**: 0.1
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**1/10**, sec=4/10, func-sec=0/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **0.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 1.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 38 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |
| 2 | 44 | ✓ | ✗ | func_small: ok; avail_unique_queries: wrong_answer: 'total=21659260' |
| 3 | 44 | ✗ | ✗ | func_small: build_fail: main.ts(3,16): error TS2693: 'ReadLine' only refers to a type, but is being used as a value here.; avail_unique_queries: build_fail: main.ts(3,16): error TS2693: 'ReadLine' only refers to a type, but is being used as a value here. |
| 4 | 37 | ✗ | ✓ | func_small: mismatch: 'total=202'; avail_unique_queries: wall=0.98s rss=63216KB |
| 5 | 38 | ✗ | ✓ | func_small: mismatch: 'total=202'; avail_unique_queries: wall=0.9s rss=63320KB |
| 6 | 37 | ✗ | ✓ | func_small: mismatch: 'total=202'; avail_unique_queries: wall=0.89s rss=63400KB |
| 7 | 37 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |
| 8 | 43 | ✗ | ✓ | func_small: mismatch: 'total=202'; avail_unique_queries: wall=0.88s rss=63520KB |
| 9 | 37 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |
| 10 | 39 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| exit=1 timed_out=False | 4 |
| crash: exit=1 | 4 |
| mismatch: 'total=202' | 4 |
| build_fail: main.ts(3,16): error TS2693: 'ReadLine' only refers to a type, but is being used as a value here. | 2 |
| wrong_answer: 'total=21659260' | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.100 | 0.400 | 0.000 |
| 3 | 0.300 | 0.833 | 0.000 |
| 5 | 0.500 | 0.976 | 0.000 |
| 10 | 1.000 | 1.000 | 0.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain --lang ts --model qwen3.5:4b -k 10 --temperature 0.1
```

生成された全世代のソースは同ディレクトリの `code/gen_01.ts` … に格納。
