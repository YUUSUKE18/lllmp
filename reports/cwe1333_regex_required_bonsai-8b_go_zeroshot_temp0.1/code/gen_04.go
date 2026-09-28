```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// リアルタイムの stdinを読み取る
	input := strings.NewReader(os.Stdin)

	for {
		input.Readline(buf)
		if len(buf) == 0 {
			break
		}

		// 空行を無視
		if strings.TrimSpace(buf) == "" {
			continue
		}

		// ループ内で行を処理
		if len(strings.TrimSpace(buf)) > 0 {
			// ループ内で行を処理
			if len(strings.TrimSpace(buf)) > 0 {
				// ループ内で行を処理
				// ループ内で行を処理
			}
		}
	}
}
