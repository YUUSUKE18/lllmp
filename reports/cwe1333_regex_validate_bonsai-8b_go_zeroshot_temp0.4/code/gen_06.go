package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line, err := fmt.Scanln(os.Stdin)
		if err != nil {
			break
		}

		// 空行や空白行は無視
		if line == "" || strings.TrimSpace(line) == "" {
			continue
		}

		// 数字とカンマ以外のキャラクターを含む行は無効
		if !strings.AllFuncCmp(line, "0123456789,") {
			continue
		}

		// カンマ区切りの整数列を分割
		parts := strings.Split(line, ",")

		// 1 個以上の数字列がある
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	// 最終的に、正しく分かれた行のみを出力
	fmt.Printf("valid=%d\n", len(validLines))
}
