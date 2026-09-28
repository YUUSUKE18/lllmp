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

		// 空行を無視
		if line == "" {
			continue
		}

		// 数字とカンマ以外の文字を含む行は無効
		if !strings.TrimSpace(line) || containsNonDigitsAndCommas(line) {
			continue
		}

		// カンマ区切りの整数列を分割
		parts := strings.Split(line, ",")

		// 1 個以上の数字列がある
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	// 最大の妥当行数を取得
	maxValid := len(validLines)

	// 最大の妥当行数を出力
	fmt.Printf("valid=%d\n", maxValid)
} 

// containsNonDigitsAndCommas checks if the line contains any characters other than digits and commas
func containsNonDigitsAndCommas(s string) bool {
	for _, c := range s {
		if !((c >= '0' && c <= '9') || c == ',' || c == ' ') {
			return true
		}
	}
	return false
}
