# 検証結果: qwen3.5:4b / go (temperature=0.7, zero-shot, think=true)

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: go
- **プロンプト**: zero-shot（例示 0 件）
- **生成オプション**: `{"num_ctx": 16384}`
- **世代数 k**: 10
- **temperature**: 0.7
- **think**: true

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**5/10**, sec=1/10, func-sec=1/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 50 | ✗ | ✗ | func_small: build_fail: ./main.go:47:3: invalid operation: total += steps(n) (mismatched types int64 and int); avail_unique_queries: build_fail: ./main.go:47:3: invalid operation: total += steps(n) (mismatched types int64 and int) |
| 2 | 51 | ✓ | ✗ | func_small: ok; avail_unique_queries: rss 355804KB > 204800KB |
| 3 | 56 | ✗ | ✗ | func_small: mismatch: 'total=32'; avail_unique_queries: rss 384516KB > 204800KB |
| 4 | 54 | ✗ | ✗ | func_small: build_fail: main.go:1:1: expected 'package', found ``; avail_unique_queries: build_fail: main.go:1:1: expected 'package', found `` |
| 5 | 58 | ✓ | ✗ | func_small: ok; avail_unique_queries: rss 349288KB > 204800KB |
| 6 | 49 | ✓ | ✗ | func_small: ok; avail_unique_queries: rss 364040KB > 204800KB |
| 7 | 50 | ✗ | ✗ | func_small: build_fail: ./main.go:46:3: invalid operation: totalSteps += steps(n) (mismatched types int64 and int); avail_unique_queries: build_fail: ./main.go:46:3: invalid operation: totalSteps += steps(n) (mismatched types int64 and int) |
| 8 | 49 | ✗ | ✗ | func_small: build_fail: ./main.go:41:13: undefined: strconv; avail_unique_queries: build_fail: ./main.go:41:13: undefined: strconv |
| 9 | 48 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.06s rss=3528KB |
| 10 | 48 | ✓ | ✗ | func_small: ok; avail_unique_queries: rss 390712KB > 204800KB |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| build_fail: ./main.go:47:3: invalid operation: total += steps(n) (mismatched types int64 and int) | 2 |
| build_fail: main.go:1:1: expected 'package', found `` | 2 |
| build_fail: ./main.go:46:3: invalid operation: totalSteps += steps(n) (mismatched types int64 and int) | 2 |
| build_fail: ./main.go:41:13: undefined: strconv | 2 |
| rss 355804KB > 204800KB | 1 |
| mismatch: 'total=32' | 1 |
| rss 384516KB > 204800KB | 1 |
| rss 349288KB > 204800KB | 1 |
| rss 364040KB > 204800KB | 1 |
| rss 390712KB > 204800KB | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.500 | 0.100 | 0.100 |
| 3 | 0.917 | 0.300 | 0.300 |
| 5 | 0.996 | 0.500 | 0.500 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain --lang go --model qwen3.5:4b -k 10 --temperature 0.7 --think --options '{"num_ctx": 16384}'
```

生成された全世代のソースは同ディレクトリの `code/gen_01.go` … に格納。
