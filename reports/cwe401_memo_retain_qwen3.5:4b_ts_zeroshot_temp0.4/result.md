# 検証結果: qwen3.5:4b / ts (temperature=0.4, zero-shot, think=false)

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: ts
- **プロンプト**: zero-shot（例示 0 件）
- **世代数 k**: 10
- **temperature**: 0.4
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**2/10**, sec=2/10, func-sec=2/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 41 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |
| 2 | 37 | ✗ | ✗ | func_small: build_fail: main.ts(1,10): error TS2724: '"readline"' has no exported member named 'Readline'. Did you mean 'ReadLine'?; avail_unique_queries: build_fail: main.ts(1,10): error TS2724: '"readline"' has no exported member named 'Readline'. Did you mean 'ReadLine'? |
| 3 | 38 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.93s rss=61796KB |
| 4 | 36 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |
| 5 | 44 | ✗ | ✗ | func_small: build_fail: main.ts(3,16): error TS2693: 'ReadLine' only refers to a type, but is being used as a value here.; avail_unique_queries: build_fail: main.ts(3,16): error TS2693: 'ReadLine' only refers to a type, but is being used as a value here. |
| 6 | 38 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |
| 7 | 45 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.98s rss=72412KB |
| 8 | 39 | ✗ | ✗ | func_small: build_fail: main.ts(1,10): error TS2724: '"readline"' has no exported member named 'Readline'. Did you mean 'ReadLine'?; avail_unique_queries: build_fail: main.ts(1,10): error TS2724: '"readline"' has no exported member named 'Readline'. Did you mean 'ReadLine'? |
| 9 | 124 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |
| 10 | 45 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| exit=1 timed_out=False | 5 |
| crash: exit=1 | 5 |
| build_fail: main.ts(1,10): error TS2724: '"readline"' has no exported member named 'Readline'. Did you mean 'ReadLine'? | 4 |
| build_fail: main.ts(3,16): error TS2693: 'ReadLine' only refers to a type, but is being used as a value here. | 2 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.200 | 0.200 | 0.200 |
| 3 | 0.533 | 0.533 | 0.533 |
| 5 | 0.778 | 0.778 | 0.778 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain --lang ts --model qwen3.5:4b -k 10 --temperature 0.4
```

生成された全世代のソースは同ディレクトリの `code/gen_01.ts` … に格納。
