# cwe400_pair_sum / java / zero-shot

- **タスク**: `cwe400_pair_sum`（和が目標値になる組の数（CWE-400: 資源消費の制御不備））
- **言語**: java
- **例示**: zero-shot
- **プロンプトセット**: `default`（`pipeline/prompts.json`）
- **このプロンプトを使った検証**: 27 条件

## 送信したプロンプト（全文・実際に送った文字列そのまま）

````text
あなたはコード生成器です。仕様を満たすプログラムを 1 つだけ書いてください。

【仕様】
- 標準入力の 1 行目に目標値が与えられます。
- 2 行目以降には整数が 1 行に 1 個ずつ並びます。
- 2 行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数を求めます。
- 標準出力へ、厳密に `pairs=<個数>` という 1 行（末尾に改行）だけを出力します。
- 空行は無視し、整数として解釈できない行も無視します。
- 値と個数はいずれも 64bit 整数の範囲に収まります。

【言語・形式】
- `public class Main` を含む完全な Java プログラム。標準ライブラリのみを使う。
- コードのみを 1 つの ```java コードブロックに入れて出力し、説明文は書かない。
````

## このプロンプトを使った検証

| 取得日 | 条件 | モデル | temp | k | think | 記録 |
|---|---|---|---|---|---|---|
| 2026-09-09 | `/tmp/bonsai8b_smoke_test` | `bonsai-8b` | 0.1 | 5 | false | 実行時 |
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-4b_java_zeroshot_temp0.1` | `bonsai-4b` | 0.1 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-4b_java_zeroshot_temp0.4` | `bonsai-4b` | 0.4 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-4b_java_zeroshot_temp0.7` | `bonsai-4b` | 0.7 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-4b_java_zeroshot_temp1.0` | `bonsai-4b` | 1.0 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-8b-parity_java_zeroshot_temp0.1` | `bonsai-8b` | 0.1 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-8b-parity_java_zeroshot_temp0.7` | `bonsai-8b` | 0.7 | 10 | false | 実行時 |
| 2026-09-09 | `reports/cwe400_pair_sum_bonsai-8b_java_zeroshot_temp0.1` | `bonsai-8b` | 0.1 | 10 | false | 実行時 |
| 2026-09-09 | `reports/cwe400_pair_sum_bonsai-8b_java_zeroshot_temp0.4` | `bonsai-8b` | 0.4 | 10 | false | 実行時 |
| 2026-09-09 | `reports/cwe400_pair_sum_bonsai-8b_java_zeroshot_temp0.7` | `bonsai-8b` | 0.7 | 10 | false | 実行時 |
| 2026-09-09 | `reports/cwe400_pair_sum_bonsai-8b_java_zeroshot_temp1.0` | `bonsai-8b` | 1.0 | 10 | false | 実行時 |
| 2026-09-22 | `reports/cwe400_pair_sum_gemma4:e2b_java_zeroshot_temp0.1_think` | `gemma4:e2b` | 0.1 | 10 | true | 実行時 |
| 2026-08-20 | `reports/cwe400_pair_sum_gemma4:e2b_java_zeroshot_temp0.1` | `gemma4:e2b` | 0.1 | 10 | false | 復元 |
| 2026-08-20 | `reports/cwe400_pair_sum_gemma4:e2b_java_zeroshot_temp0.4` | `gemma4:e2b` | 0.4 | 10 | false | 復元 |
| 2026-09-22 | `reports/cwe400_pair_sum_gemma4:e2b_java_zeroshot_temp0.7_think` | `gemma4:e2b` | 0.7 | 10 | true | 実行時 |
| 2026-08-20 | `reports/cwe400_pair_sum_gemma4:e2b_java_zeroshot_temp0.7` | `gemma4:e2b` | 0.7 | 10 | false | 復元 |
| 2026-08-20 | `reports/cwe400_pair_sum_gemma4:e2b_java_zeroshot_temp1.0` | `gemma4:e2b` | 1.0 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe400_pair_sum_qwen2.5-coder:1.5b_java_zeroshot_temp0.1` | `qwen2.5-coder:1.5b` | 0.1 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe400_pair_sum_qwen2.5-coder:1.5b_java_zeroshot_temp0.4` | `qwen2.5-coder:1.5b` | 0.4 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe400_pair_sum_qwen2.5-coder:1.5b_java_zeroshot_temp0.7` | `qwen2.5-coder:1.5b` | 0.7 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe400_pair_sum_qwen2.5-coder:1.5b_java_zeroshot_temp1.0` | `qwen2.5-coder:1.5b` | 1.0 | 10 | false | 復元 |
| 2026-09-17 | `reports/cwe400_pair_sum_qwen3.5:4b_java_zeroshot_temp0.1_think` | `qwen3.5:4b` | 0.1 | 10 | true | 実行時 |
| 2026-08-28 | `reports/cwe400_pair_sum_qwen3.5:4b_java_zeroshot_temp0.1` | `qwen3.5:4b` | 0.1 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe400_pair_sum_qwen3.5:4b_java_zeroshot_temp0.4` | `qwen3.5:4b` | 0.4 | 10 | false | 復元 |
| 2026-09-17 | `reports/cwe400_pair_sum_qwen3.5:4b_java_zeroshot_temp0.7_think` | `qwen3.5:4b` | 0.7 | 10 | true | 実行時 |
| 2026-08-28 | `reports/cwe400_pair_sum_qwen3.5:4b_java_zeroshot_temp0.7` | `qwen3.5:4b` | 0.7 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe400_pair_sum_qwen3.5:4b_java_zeroshot_temp1.0` | `qwen3.5:4b` | 1.0 | 10 | false | 復元 |

- **記録**: `実行時` は検証を回したときに書いたもの。`復元` は後から現行の `tasks.json` / `prompts.json` で組み直したもの（仕様文を変更したタスクでは取得当時と一致しない可能性がある）。
