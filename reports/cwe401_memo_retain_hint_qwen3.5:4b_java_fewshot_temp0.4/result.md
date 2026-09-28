# 検証結果: qwen3.5:4b / java (temperature=0.4, few-shot(3), think=false)

- **タスク**: `cwe401_memo_retain_hint`（Collatz 手数の合計・メモ化あり・安全性ヒントあり（CWE-401: 解放されない保持））
- **言語**: java
- **プロンプト**: few-shot(3)（例示 3 件）
- **世代数 k**: 10
- **temperature**: 0.4
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**2/10**, sec=1/10, func-sec=0/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **0.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 1.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 63 | ✗ | ✗ | func_small: exit=124 timed_out=True; avail_unique_queries: TIMEOUT |
| 2 | 46 | ✓ | ✗ | func_small: ok; avail_unique_queries: crash: exit=1 |
| 3 | 61 | ✗ | ✗ | func_small: mismatch: 'total=201'; avail_unique_queries: TIMEOUT |
| 4 | 47 | ✗ | ✗ | func_small: mismatch: 'total=178'; avail_unique_queries: wrong_answer: 'total=21652858' |
| 5 | 48 | ✗ | ✓ | func_small: mismatch: 'total=202'; avail_unique_queries: wall=0.12s rss=43196KB |
| 6 | 55 | ✗ | ✗ | func_small: exit=124 timed_out=True; avail_unique_queries: TIMEOUT |
| 7 | 52 | ✗ | ✗ | func_small: build_fail: Main.java:44: error: incompatible types: possible lossy conversion from long to int; avail_unique_queries: build_fail: Main.java:44: error: incompatible types: possible lossy conversion from long to int |
| 8 | 69 | ✗ | ✗ | func_small: mismatch: 'total=0'; avail_unique_queries: wrong_answer: 'total=0' |
| 9 | 45 | ✓ | ✗ | func_small: ok; avail_unique_queries: crash: exit=1 |
| 10 | 225 | ✗ | ✗ | func_small: build_fail: Main.java:1: error: illegal character: '`'; avail_unique_queries: build_fail: Main.java:1: error: illegal character: '`' |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| TIMEOUT | 3 |
| exit=124 timed_out=True | 2 |
| crash: exit=1 | 2 |
| build_fail: Main.java:44: error: incompatible types: possible lossy conversion from long to int | 2 |
| build_fail: Main.java:1: error: illegal character: '`' | 2 |
| mismatch: 'total=201' | 1 |
| mismatch: 'total=178' | 1 |
| wrong_answer: 'total=21652858' | 1 |
| mismatch: 'total=202' | 1 |
| mismatch: 'total=0' | 1 |
| wrong_answer: 'total=0' | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.200 | 0.100 | 0.000 |
| 3 | 0.533 | 0.300 | 0.000 |
| 5 | 0.778 | 0.500 | 0.000 |
| 10 | 1.000 | 1.000 | 0.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain_hint --lang java --model qwen3.5:4b -k 10 --temperature 0.4 --shots 3
```

生成された全世代のソースは同ディレクトリの `code/gen_01.java` … に格納。
