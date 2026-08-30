# 検証結果: gemma4:e2b / ts (temperature=0.1, few-shot(3), think=false)

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: ts
- **プロンプト**: few-shot(3)（例示 3 件）
- **世代数 k**: 10
- **temperature**: 0.1
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**7/10**, sec=6/10, func-sec=6/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 89 | ✗ | ✗ | func_small: mismatch: 'total=0'; avail_unique_queries: wrong_answer: 'total=0' |
| 2 | 60 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.06s rss=68724KB |
| 3 | 54 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.05s rss=68484KB |
| 4 | 84 | ✗ | ✗ | func_small: mismatch: 'total=NaN'; avail_unique_queries: crash: exit=134 |
| 5 | 103 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=2.94s rss=70292KB |
| 6 | 65 | ✓ | ✗ | func_small: ok; avail_unique_queries: crash: exit=134 |
| 7 | 65 | ✗ | ✗ | func_small: mismatch: ''; avail_unique_queries: crash: exit=134 |
| 8 | 58 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.09s rss=72600KB |
| 9 | 58 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.05s rss=68940KB |
| 10 | 53 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=1.1s rss=68780KB |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| crash: exit=134 | 3 |
| mismatch: 'total=0' | 1 |
| wrong_answer: 'total=0' | 1 |
| mismatch: 'total=NaN' | 1 |
| mismatch: '' | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.700 | 0.600 | 0.600 |
| 3 | 0.992 | 0.967 | 0.967 |
| 5 | 1.000 | 1.000 | 1.000 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain --lang ts --model gemma4:e2b -k 10 --temperature 0.1 --shots 3
```

生成された全世代のソースは同ディレクトリの `code/gen_01.ts` … に格納。
