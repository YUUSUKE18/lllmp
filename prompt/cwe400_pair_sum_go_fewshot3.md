# cwe400_pair_sum / go / few-shot(3)

- **タスク**: `cwe400_pair_sum`（和が目標値になる組の数（CWE-400: 資源消費の制御不備））
- **言語**: go
- **例示**: few-shot(3)（セット `shots.json`）
- **プロンプトセット**: `default`（`pipeline/prompts.json`）
- **このプロンプトを使った検証**: 20 条件

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

例2）課題: カンマ区切りの語を読み、空でない語の数を `words=<個数>` の1行で出力する。
```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	c := 0
	for _, w := range strings.Split(sc.Text(), ",") {
		if strings.TrimSpace(w) != "" {
			c++
		}
	}
	fmt.Printf("words=%d\n", c)
}
```

例3）課題: 標準入力全体を読み、行数と文字数を `lines=<行数> chars=<文字数>` の1行で出力する。
```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	buf := make([]byte, 64*1024)
	lines, chars := 0, 0
	for {
		n, err := r.Read(buf)
		for i := 0; i < n; i++ {
			chars++
			if buf[i] == '\n' {
				lines++
			}
		}
		if err != nil {
			break
		}
	}
	fmt.Printf("lines=%d chars=%d\n", lines, chars)
}
```

では、同じ形式（標準入力を読み、指定どおり 1 行だけ出力）で次の課題を解いてください。

【仕様】
- 標準入力の 1 行目に目標値が与えられます。
- 2 行目以降には整数が 1 行に 1 個ずつ並びます。
- 2 行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数を求めます。
- 標準出力へ、厳密に `pairs=<個数>` という 1 行（末尾に改行）だけを出力します。
- 空行は無視し、整数として解釈できない行も無視します。
- 値と個数はいずれも 64bit 整数の範囲に収まります。

【言語・形式】
- 完全な Go プログラム。`package main` と `func main` を含み、標準ライブラリのみを使う。
- コードのみを 1 つの ```go コードブロックに入れて出力し、説明文は書かない。
````

## このプロンプトを使った検証

| 取得日 | 条件 | モデル | temp | k | think | 記録 |
|---|---|---|---|---|---|---|
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-4b_go_fewshot_temp0.1` | `bonsai-4b` | 0.1 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-4b_go_fewshot_temp0.4` | `bonsai-4b` | 0.4 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-4b_go_fewshot_temp0.7` | `bonsai-4b` | 0.7 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe400_pair_sum_bonsai-4b_go_fewshot_temp1.0` | `bonsai-4b` | 1.0 | 10 | false | 実行時 |
| 2026-09-09 | `reports/cwe400_pair_sum_bonsai-8b_go_fewshot_temp0.1` | `bonsai-8b` | 0.1 | 10 | false | 実行時 |
| 2026-09-09 | `reports/cwe400_pair_sum_bonsai-8b_go_fewshot_temp0.4` | `bonsai-8b` | 0.4 | 10 | false | 実行時 |
| 2026-09-10 | `reports/cwe400_pair_sum_bonsai-8b_go_fewshot_temp0.7` | `bonsai-8b` | 0.7 | 10 | false | 実行時 |
| 2026-09-10 | `reports/cwe400_pair_sum_bonsai-8b_go_fewshot_temp1.0` | `bonsai-8b` | 1.0 | 10 | false | 実行時 |
| 2026-08-20 | `reports/cwe400_pair_sum_gemma4:e2b_go_fewshot_temp0.1` | `gemma4:e2b` | 0.1 | 10 | false | 復元 |
| 2026-08-20 | `reports/cwe400_pair_sum_gemma4:e2b_go_fewshot_temp0.4` | `gemma4:e2b` | 0.4 | 10 | false | 復元 |
| 2026-08-20 | `reports/cwe400_pair_sum_gemma4:e2b_go_fewshot_temp0.7` | `gemma4:e2b` | 0.7 | 10 | false | 復元 |
| 2026-08-20 | `reports/cwe400_pair_sum_gemma4:e2b_go_fewshot_temp1.0` | `gemma4:e2b` | 1.0 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe400_pair_sum_qwen2.5-coder:1.5b_go_fewshot_temp0.1` | `qwen2.5-coder:1.5b` | 0.1 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe400_pair_sum_qwen2.5-coder:1.5b_go_fewshot_temp0.4` | `qwen2.5-coder:1.5b` | 0.4 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe400_pair_sum_qwen2.5-coder:1.5b_go_fewshot_temp0.7` | `qwen2.5-coder:1.5b` | 0.7 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe400_pair_sum_qwen2.5-coder:1.5b_go_fewshot_temp1.0` | `qwen2.5-coder:1.5b` | 1.0 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe400_pair_sum_qwen3.5:4b_go_fewshot_temp0.1` | `qwen3.5:4b` | 0.1 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe400_pair_sum_qwen3.5:4b_go_fewshot_temp0.4` | `qwen3.5:4b` | 0.4 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe400_pair_sum_qwen3.5:4b_go_fewshot_temp0.7` | `qwen3.5:4b` | 0.7 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe400_pair_sum_qwen3.5:4b_go_fewshot_temp1.0` | `qwen3.5:4b` | 1.0 | 10 | false | 復元 |

- **記録**: `実行時` は検証を回したときに書いたもの。`復元` は後から現行の `tasks.json` / `prompts.json` で組み直したもの（仕様文を変更したタスクでは取得当時と一致しない可能性がある）。
