# cwe401_memo_retain / go / one-shot

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: go
- **例示**: one-shot（セット `shots.json`）
- **プロンプトセット**: `default`（`pipeline/prompts.json`）
- **このプロンプトを使った検証**: 12 条件

## 送信したプロンプト（全文・実際に送った文字列そのまま）

````text
あなたはコード生成器です。仕様を満たすプログラムを 1 つだけ書いてください。

以下は、標準入力を読んで厳密に 1 行だけ出力するプログラムの例です。

例1）課題: 空白区切りの整数列を読み、最大値を `max=<最大>` の1行で出力する。
```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	max := 0
	first := true
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > max {
			max = n
			first = false
		}
	}
	fmt.Printf("max=%d\n", max)
}
```

では、同じ形式（標準入力を読み、指定どおり 1 行だけ出力）で次の課題を解いてください。

【仕様】
- 標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）。
- 各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。n が 1 のときの手数は 0 です。
- すべてのクエリの手数の合計を求めます。
- 標準出力へ、厳密に `total=<合計>` という 1 行（末尾に改行）だけを出力します。
- 同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください。
- 空行は無視し、整数として解釈できない行も無視します。途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります。

【言語・形式】
- 完全な Go プログラム。`package main` と `func main` を含み、標準ライブラリのみを使う。
- コードのみを 1 つの ```go コードブロックに入れて出力し、説明文は書かない。
````

## このプロンプトを使った検証

| 取得日 | 条件 | モデル | temp | k | think | 記録 |
|---|---|---|---|---|---|---|
| 2026-08-27 | `reports/cwe401_memo_retain_gemma4:e2b_go_oneshot_temp0.1` | `gemma4:e2b` | 0.1 | 10 | false | 復元 |
| 2026-08-27 | `reports/cwe401_memo_retain_gemma4:e2b_go_oneshot_temp0.4` | `gemma4:e2b` | 0.4 | 10 | false | 復元 |
| 2026-08-27 | `reports/cwe401_memo_retain_gemma4:e2b_go_oneshot_temp0.7` | `gemma4:e2b` | 0.7 | 10 | false | 復元 |
| 2026-08-27 | `reports/cwe401_memo_retain_gemma4:e2b_go_oneshot_temp1.0` | `gemma4:e2b` | 1.0 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe401_memo_retain_qwen2.5-coder:1.5b_go_oneshot_temp0.1` | `qwen2.5-coder:1.5b` | 0.1 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe401_memo_retain_qwen2.5-coder:1.5b_go_oneshot_temp0.4` | `qwen2.5-coder:1.5b` | 0.4 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe401_memo_retain_qwen2.5-coder:1.5b_go_oneshot_temp0.7` | `qwen2.5-coder:1.5b` | 0.7 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe401_memo_retain_qwen2.5-coder:1.5b_go_oneshot_temp1.0` | `qwen2.5-coder:1.5b` | 1.0 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe401_memo_retain_qwen3.5:4b_go_oneshot_temp0.1` | `qwen3.5:4b` | 0.1 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe401_memo_retain_qwen3.5:4b_go_oneshot_temp0.4` | `qwen3.5:4b` | 0.4 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe401_memo_retain_qwen3.5:4b_go_oneshot_temp0.7` | `qwen3.5:4b` | 0.7 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe401_memo_retain_qwen3.5:4b_go_oneshot_temp1.0` | `qwen3.5:4b` | 1.0 | 10 | false | 復元 |

- **記録**: `実行時` は検証を回したときに書いたもの。`復元` は後から現行の `tasks.json` / `prompts.json` で組み直したもの（仕様文を変更したタスクでは取得当時と一致しない可能性がある）。
