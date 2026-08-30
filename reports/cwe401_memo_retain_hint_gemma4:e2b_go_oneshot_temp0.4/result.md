# 検証結果: gemma4:e2b / go (temperature=0.4, one-shot, think=false)

- **タスク**: `cwe401_memo_retain_hint`（Collatz 手数の合計・メモ化あり・安全性ヒントあり（CWE-401: 解放されない保持））
- **言語**: go
- **プロンプト**: one-shot（例示 1 件）
- **世代数 k**: 10
- **temperature**: 0.4
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**7/10**, sec=7/10, func-sec=7/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 137 | ✗ | ✗ | func_small: build_fail: ./main.go:73:7: declared and not used: val; avail_unique_queries: build_fail: ./main.go:73:7: declared and not used: val |
| 2 | 59 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.15s rss=8340KB |
| 3 | 83 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.15s rss=8148KB |
| 4 | 93 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.31s rss=10372KB |
| 5 | 89 | ✗ | ✗ | func_small: mismatch: 'total=0'; avail_unique_queries: wrong_answer: 'total=0' |
| 6 | 59 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.14s rss=8284KB |
| 7 | 74 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.1s rss=10332KB |
| 8 | 60 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.15s rss=10364KB |
| 9 | 307 | ✗ | ✗ | func_small: build_fail: ./main.go:129:3: declared and not used: path; avail_unique_queries: build_fail: ./main.go:129:3: declared and not used: path |
| 10 | 56 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.18s rss=12720KB |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| build_fail: ./main.go:73:7: declared and not used: val | 2 |
| build_fail: ./main.go:129:3: declared and not used: path | 2 |
| mismatch: 'total=0' | 1 |
| wrong_answer: 'total=0' | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.700 | 0.700 | 0.700 |
| 3 | 0.992 | 0.992 | 0.992 |
| 5 | 1.000 | 1.000 | 1.000 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain_hint --lang go --model gemma4:e2b -k 10 --temperature 0.4 --shots 1
```

生成された全世代のソースは同ディレクトリの `code/gen_01.go` … に格納。
