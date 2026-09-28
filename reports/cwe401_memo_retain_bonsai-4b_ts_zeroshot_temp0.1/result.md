# 検証結果: bonsai-4b / ts (temperature=0.1, zero-shot, think=false)

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: ts
- **プロンプト**: zero-shot（例示 0 件）
- **世代数 k**: 10
- **temperature**: 0.1
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
| 1 | 35 | ✗ | ✗ | func_small: build_fail: main.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'process'.; avail_unique_queries: build_fail: main.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'process'. |
| 2 | 33 | ✗ | ✗ | func_small: build_fail: main.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'process'.; avail_unique_queries: build_fail: main.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'process'. |
| 3 | 110 | ✗ | ✗ | func_small: build_fail: main.ts(111,1): error TS1160: Unterminated template literal.; avail_unique_queries: build_fail: main.ts(111,1): error TS1160: Unterminated template literal. |
| 4 | 93 | ✗ | ✗ | func_small: build_fail: main.ts(94,1): error TS1160: Unterminated template literal.; avail_unique_queries: build_fail: main.ts(94,1): error TS1160: Unterminated template literal. |
| 5 | 37 | ✗ | ✗ | func_small: build_fail: main.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'process'.; avail_unique_queries: build_fail: main.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'process'. |
| 6 | 39 | ✗ | ✗ | func_small: build_fail: main.ts(25,40): error TS17006: An unary expression with the '-' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses.; avail_unique_queries: build_fail: main.ts(25,40): error TS17006: An unary expression with the '-' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses. |
| 7 | 41 | ✗ | ✗ | func_small: build_fail: main.ts(26,40): error TS17006: An unary expression with the '-' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses.; avail_unique_queries: build_fail: main.ts(26,40): error TS17006: An unary expression with the '-' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses. |
| 8 | 34 | ✗ | ✗ | func_small: build_fail: main.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'process'.; avail_unique_queries: build_fail: main.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'process'. |
| 9 | 98 | ✗ | ✗ | func_small: build_fail: main.ts(99,1): error TS1160: Unterminated template literal.; avail_unique_queries: build_fail: main.ts(99,1): error TS1160: Unterminated template literal. |
| 10 | 44 | ✗ | ✗ | func_small: build_fail: main.ts(25,40): error TS17006: An unary expression with the '-' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses.; avail_unique_queries: build_fail: main.ts(25,40): error TS17006: An unary expression with the '-' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses. |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| build_fail: main.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'process'. | 8 |
| build_fail: main.ts(25,40): error TS17006: An unary expression with the '-' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses. | 4 |
| build_fail: main.ts(111,1): error TS1160: Unterminated template literal. | 2 |
| build_fail: main.ts(94,1): error TS1160: Unterminated template literal. | 2 |
| build_fail: main.ts(26,40): error TS17006: An unary expression with the '-' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses. | 2 |
| build_fail: main.ts(99,1): error TS1160: Unterminated template literal. | 2 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.000 | 0.000 | 0.000 |
| 3 | 0.000 | 0.000 | 0.000 |
| 5 | 0.000 | 0.000 | 0.000 |
| 10 | 0.000 | 0.000 | 0.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe401_memo_retain --lang ts --model bonsai-4b -k 10 --temperature 0.1
```

生成された全世代のソースは同ディレクトリの `code/gen_01.ts` … に格納。
