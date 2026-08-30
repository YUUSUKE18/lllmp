# 検証結果: gemma4:e2b / go (temperature=1.0, few-shot(3), think=false)

- **タスク**: `cwe835_declared_count`（宣言された個数の整数列（CWE-835: 到達不能な終了条件を持つループ））
- **言語**: go
- **プロンプト**: few-shot(3)（例示 3 件）
- **世代数 k**: 10
- **temperature**: 1.0
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**1/10**, sec=1/10, func-sec=1/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 52 | ✗ | ✗ | func_small: build_fail: ./main.go:22:2: declared and not used: count; avail_liar_count: build_fail: ./main.go:22:2: declared and not used: count |
| 2 | 52 | ✗ | ✗ | func_small: build_fail: ./main.go:20:2: declared and not used: count; avail_liar_count: build_fail: ./main.go:20:2: declared and not used: count |
| 3 | 57 | ✓ | ✓ | func_small: ok; avail_liar_count: wall=0.0s rss=3528KB |
| 4 | 51 | ✗ | ✗ | func_small: mismatch: 'count=6 sum=6'; avail_liar_count: wrong_answer: 'count=2147483652 sum=15' |
| 5 | 49 | ✗ | ✗ | func_small: build_fail: ./main.go:20:2: declared and not used: count; avail_liar_count: build_fail: ./main.go:20:2: declared and not used: count |
| 6 | 61 | ✗ | ✗ | func_small: build_fail: ./main.go:31:2: declared and not used: count; avail_liar_count: build_fail: ./main.go:31:2: declared and not used: count |
| 7 | 52 | ✗ | ✗ | func_small: build_fail: ./main.go:22:2: declared and not used: count; avail_liar_count: build_fail: ./main.go:22:2: declared and not used: count |
| 8 | 54 | ✗ | ✗ | func_small: build_fail: ./main.go:21:2: declared and not used: count; avail_liar_count: build_fail: ./main.go:21:2: declared and not used: count |
| 9 | 55 | ✗ | ✗ | func_small: build_fail: ./main.go:26:2: declared and not used: numCount; avail_liar_count: build_fail: ./main.go:26:2: declared and not used: numCount |
| 10 | 55 | ✗ | ✗ | func_small: build_fail: ./main.go:21:2: declared and not used: expectedCount; avail_liar_count: build_fail: ./main.go:21:2: declared and not used: expectedCount |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| build_fail: ./main.go:22:2: declared and not used: count | 4 |
| build_fail: ./main.go:20:2: declared and not used: count | 4 |
| build_fail: ./main.go:31:2: declared and not used: count | 2 |
| build_fail: ./main.go:21:2: declared and not used: count | 2 |
| build_fail: ./main.go:26:2: declared and not used: numCount | 2 |
| build_fail: ./main.go:21:2: declared and not used: expectedCount | 2 |
| mismatch: 'count=6 sum=6' | 1 |
| wrong_answer: 'count=2147483652 sum=15' | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.100 | 0.100 | 0.100 |
| 3 | 0.300 | 0.300 | 0.300 |
| 5 | 0.500 | 0.500 | 0.500 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe835_declared_count --lang go --model gemma4:e2b -k 10 --temperature 1.0 --shots 3
```

生成された全世代のソースは同ディレクトリの `code/gen_01.go` … に格納。
