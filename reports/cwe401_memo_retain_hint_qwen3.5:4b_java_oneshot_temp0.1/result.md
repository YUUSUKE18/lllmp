# 検証結果: qwen3.5:4b / java (temperature=0.1, one-shot, think=false)

- **タスク**: `cwe401_memo_retain_hint`（Collatz 手数の合計・メモ化あり・安全性ヒントあり（CWE-401: 解放されない保持））
- **言語**: java
- **プロンプト**: one-shot（例示 1 件）
- **世代数 k**: 10
- **temperature**: 0.1
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**4/10**, sec=3/10, func-sec=2/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 55 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.16s rss=51572KB |
| 2 | 59 | ✗ | ✗ | func_small: exit=124 timed_out=True; avail_unique_queries: TIMEOUT |
| 3 | 55 | ✗ | ✗ | func_small: build_fail: Main.java:42: error: incompatible types: possible lossy conversion from long to int; avail_unique_queries: build_fail: Main.java:42: error: incompatible types: possible lossy conversion from long to int |
| 4 | 58 | ✓ | ✗ | func_small: ok; avail_unique_queries: TIMEOUT |
| 5 | 76 | ✗ | ✗ | func_small: mismatch: 'total=0'; avail_unique_queries: wrong_answer: 'total=0' |
| 6 | 50 | ✗ | ✗ | func_small: build_fail: Main.java:25: error: incompatible types: long cannot be converted to Integer; avail_unique_queries: build_fail: Main.java:25: error: incompatible types: long cannot be converted to Integer |
| 7 | 49 | ✗ | ✓ | func_small: mismatch: 'total=202'; avail_unique_queries: wall=0.11s rss=43620KB |
| 8 | 68 | ✗ | ✗ | func_small: build_fail: Main.java:45: error: incompatible types: possible lossy conversion from long to int; avail_unique_queries: build_fail: Main.java:45: error: incompatible types: possible lossy conversion from long to int |
| 9 | 56 | ✓ | ✗ | func_small: ok; avail_unique_queries: crash: exit=1 |
| 10 | 52 | ✓ | ✓ | func_small: ok; avail_unique_queries: wall=0.12s rss=43032KB |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| TIMEOUT | 2 |
| build_fail: Main.java:42: error: incompatible types: possible lossy conversion from long to int | 2 |
| build_fail: Main.java:25: error: incompatible types: long cannot be converted to Integer | 2 |
| build_fail: Main.java:45: error: incompatible types: possible lossy conversion from long to int | 2 |
| exit=124 timed_out=True | 1 |
| mismatch: 'total=0' | 1 |
| wrong_answer: 'total=0' | 1 |
| mismatch: 'total=202' | 1 |
| crash: exit=1 | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.400 | 0.300 | 0.200 |
| 3 | 0.833 | 0.708 | 0.533 |
| 5 | 0.976 | 0.917 | 0.778 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain_hint --lang java --model qwen3.5:4b -k 10 --temperature 0.1 --shots 1
```

生成された全世代のソースは同ディレクトリの `code/gen_01.java` … に格納。
