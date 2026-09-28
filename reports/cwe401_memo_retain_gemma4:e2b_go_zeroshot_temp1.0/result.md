# 検証結果: gemma4:e2b / go (temperature=1.0, zero-shot, think=false)

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: go
- **プロンプト**: zero-shot（例示 0 件）
- **世代数 k**: 10
- **temperature**: 1.0
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**5/10**, sec=5/10, func-sec=5/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 117 | ✗ | ✗ | func_small: build_fail: ./main.go:95:6: invalid operation: pathSteps += localMemo[currentN] (mismatched types int and int64); avail_unique_queries: build_fail: ./main.go:95:6: invalid operation: pathSteps += localMemo[currentN] (mismatched types int and int64) |
| 2 | 61 | ✗ | ✗ | func_small: mismatch: 'total=0'; avail_unique_queries: rss 374288KB > 204800KB |
| 3 | 69 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.27s rss=7944KB |
| 4 | 61 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.1s rss=10280KB |
| 5 | 64 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.19s rss=16588KB |
| 6 | 91 | ✗ | ✗ | func_small: mismatch: 'total=0'; avail_unique_queries: wrong_answer: 'total=0' |
| 7 | 83 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.06s rss=9984KB |
| 8 | 84 | ✗ | ✗ | func_small: mismatch: 'total=0'; avail_unique_queries: rss 398940KB > 204800KB |
| 9 | 62 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.14s rss=13036KB |
| 10 | 64 | ✗ | ✗ | func_small: mismatch: 'total=0'; avail_unique_queries: rss 347564KB > 204800KB |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| mismatch: 'total=0' | 4 |
| build_fail: ./main.go:95:6: invalid operation: pathSteps += localMemo[currentN] (mismatched types int and int64) | 2 |
| rss 374288KB > 204800KB | 1 |
| wrong_answer: 'total=0' | 1 |
| rss 398940KB > 204800KB | 1 |
| rss 347564KB > 204800KB | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.500 | 0.500 | 0.500 |
| 3 | 0.917 | 0.917 | 0.917 |
| 5 | 0.996 | 0.996 | 0.996 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain --lang go --model gemma4:e2b -k 10 --temperature 1.0
```

生成された全世代のソースは同ディレクトリの `code/gen_01.go` … に格納。
