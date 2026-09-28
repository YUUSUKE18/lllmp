# 検証結果: qwen3.5:4b / java (temperature=1.0, one-shot, think=false)

- **タスク**: `cwe835_declared_count`（宣言された個数の整数列（CWE-835: 到達不能な終了条件を持つループ））
- **言語**: java
- **プロンプト**: one-shot（例示 1 件）
- **世代数 k**: 10
- **temperature**: 1.0
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**6/10**, sec=6/10, func-sec=6/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 51 | ✗ | ✗ | func_small: mismatch: 'count=6 sum=6'; avail_liar_count: wrong_answer: 'count=-2147483644 sum=15' |
| 2 | 50 | ✓ | ✓ | func_small: ok; avail_liar_count: wall=0.03s rss=39900KB |
| 3 | 39 | ✓ | ✓ | func_small: ok; avail_liar_count: wall=0.03s rss=39764KB |
| 4 | 74 | ✓ | ✓ | func_small: ok; avail_liar_count: wall=0.04s rss=39716KB |
| 5 | 86 | ✗ | ✗ | func_small: mismatch: 'count=0 sum=0'; avail_liar_count: wrong_answer: 'count=0 sum=0' |
| 6 | 43 | ✗ | ✗ | func_small: build_fail: Main.java:22: error: ',', ')', or '[' expected; avail_liar_count: build_fail: Main.java:22: error: ',', ')', or '[' expected |
| 7 | 42 | ✓ | ✓ | func_small: ok; avail_liar_count: wall=0.03s rss=40096KB |
| 8 | 42 | ✓ | ✓ | func_small: ok; avail_liar_count: wall=0.03s rss=40004KB |
| 9 | 60 | ✓ | ✓ | func_small: ok; avail_liar_count: wall=0.03s rss=37832KB |
| 10 | 47 | ✗ | ✗ | func_small: build_fail: Main.java:35: error: cannot find symbol; avail_liar_count: build_fail: Main.java:35: error: cannot find symbol |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| build_fail: Main.java:22: error: ',', ')', or '[' expected | 2 |
| build_fail: Main.java:35: error: cannot find symbol | 2 |
| mismatch: 'count=6 sum=6' | 1 |
| wrong_answer: 'count=-2147483644 sum=15' | 1 |
| mismatch: 'count=0 sum=0' | 1 |
| wrong_answer: 'count=0 sum=0' | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.600 | 0.600 | 0.600 |
| 3 | 0.967 | 0.967 | 0.967 |
| 5 | 1.000 | 1.000 | 1.000 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe835_declared_count --lang java --model qwen3.5:4b -k 10 --temperature 1.0 --shots 1
```

生成された全世代のソースは同ディレクトリの `code/gen_01.java` … に格納。
