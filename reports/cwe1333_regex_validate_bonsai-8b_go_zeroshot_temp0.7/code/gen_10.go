package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// データ入力処理
	for {
		line, err := fmt.Scanln(os.Stdin)
		if err != nil {
			break
		}

		// 空行や不整合した行は無視
		if line == "" || !strings.TrimSpace(line) {
			continue
		}

		// 数値とカンマ以外の文字のみを含む行は無視
		if !strings.TrimSpace(line) || !regexp.MatchAll(`[^0-9,]+`, line, nil) {
			continue
		}

		// カンマ区切りの整数列を正しく分割
		parts := strings.Split(line, ",")
		if len(parts) >= 2 {
			validLines = append(validLines, line)
		}
	}

	// 素計された行数を出力
	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	} else {
		fmt.Println("valid=0")
	}
}
