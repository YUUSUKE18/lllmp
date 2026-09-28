# 検証結果: qwen3.5:4b / java (temperature=1.0, few-shot(3), think=false)

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: java
- **プロンプト**: few-shot(3)（例示 3 件）
- **世代数 k**: 10
- **temperature**: 1.0
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**0/10**, sec=0/10, func-sec=0/10 |
| func@10 | **0.000** |
| sec@10 | **0.000** |
| func-sec@10 | **0.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 169 | ✗ | ✗ | func_small: build_fail: Main.java:168: error: class, interface, enum, or record expected; avail_unique_queries: build_fail: Main.java:168: error: class, interface, enum, or record expected |
| 2 | 107 | ✗ | ✗ | func_small: exit=124 timed_out=True; avail_unique_queries: TIMEOUT |
| 3 | 85 | ✗ | ✗ | func_small: build_fail: Main.java:32: error: incompatible types: possible lossy conversion from long to int; avail_unique_queries: build_fail: Main.java:32: error: incompatible types: possible lossy conversion from long to int |
| 4 | 47 | ✗ | ✗ | func_small: build_fail: Main.java:41: error: incompatible types: possible lossy conversion from long to int; avail_unique_queries: build_fail: Main.java:41: error: incompatible types: possible lossy conversion from long to int |
| 5 | 41 | ✗ | ✗ | func_small: exit=1 timed_out=False; avail_unique_queries: crash: exit=1 |
| 6 | 59 | ✗ | ✗ | func_small: build_fail: Main.java:54: error: cannot find symbol; avail_unique_queries: build_fail: Main.java:54: error: cannot find symbol |
| 7 | 61 | ✗ | ✗ | func_small: build_fail: Main.java:45: error: cannot find symbol; avail_unique_queries: build_fail: Main.java:45: error: cannot find symbol |
| 8 | 127 | ✗ | ✗ | func_small: build_fail: Main.java:69: error: 'else' without 'if'; avail_unique_queries: build_fail: Main.java:69: error: 'else' without 'if' |
| 9 | 55 | ✗ | ✗ | func_small: build_fail: Main.java:14: error: bad operand types for binary operator '!='; avail_unique_queries: build_fail: Main.java:14: error: bad operand types for binary operator '!=' |
| 10 | 54 | ✗ | ✗ | func_small: build_fail: Main.java:52: error: cannot find symbol; avail_unique_queries: build_fail: Main.java:52: error: cannot find symbol |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| build_fail: Main.java:168: error: class, interface, enum, or record expected | 2 |
| build_fail: Main.java:32: error: incompatible types: possible lossy conversion from long to int | 2 |
| build_fail: Main.java:41: error: incompatible types: possible lossy conversion from long to int | 2 |
| build_fail: Main.java:54: error: cannot find symbol | 2 |
| build_fail: Main.java:45: error: cannot find symbol | 2 |
| build_fail: Main.java:69: error: 'else' without 'if' | 2 |
| build_fail: Main.java:14: error: bad operand types for binary operator '!=' | 2 |
| build_fail: Main.java:52: error: cannot find symbol | 2 |
| exit=124 timed_out=True | 1 |
| TIMEOUT | 1 |
| exit=1 timed_out=False | 1 |
| crash: exit=1 | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.000 | 0.000 | 0.000 |
| 3 | 0.000 | 0.000 | 0.000 |
| 5 | 0.000 | 0.000 | 0.000 |
| 10 | 0.000 | 0.000 | 0.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain --lang java --model qwen3.5:4b -k 10 --temperature 1.0 --shots 3
```

生成された全世代のソースは同ディレクトリの `code/gen_01.java` … に格納。
