package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// リアルタイムの stdinから行を読み込む
	for {
		input, err := fmt.ScanLine()
		if err != nil {
			break
		}

		// 空行や空白行は無視
		if strings.TrimSpace(input) == "" {
			continue
		}

		// ラベルを除去して、カンマ区切りの整数列を抽出
		trimmed := strings.TrimSpace(input)
		parts := strings.Split(trimmed, ",")

		// パーツが1以上で、すべて数字である
		if len(parts) > 1 && allDigits(parts) {
			validLines = append(validLines, trimmed)
		}
	}

	// 最大の妥当行数を取得
	maxValid := len(validLines)

	// 最大の妥当行数を出力
	fmt.Printf("valid=%d\n", maxValid)
}

// allDigits checks if all parts are digits
func allDigits(parts []string) bool {
	for _, part := range parts {
		if !isDigit(part) {
			return false
		}
	}
	return true

// isDigit checks if a string is a digit
func isDigit(s string) bool {
	if len(s) == 0 {
		return false
	}
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}
