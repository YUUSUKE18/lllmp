package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	// リアルタイムの stdin オプション
	scanner := bufio.NewScanner(os.Stdin)
	var validLines int

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		// ルールの検証
		// - 数字とカンマ以外を含まない
		if hasInvalidChars(line) {
			continue
		}

		// - カンマ区切りの整数列
		parts := strings.Split(line, ",")
		if len(parts) < 2 {
			continue
		}

		// - 每部は整数
		valid := true
		for _, part := range parts {
			if !isInteger(part) {
				valid = false
				break
			}
		}

		if valid {
			validLines++
		}
	}

	// 組み合わせ
	fmt.Println("valid=" + fmt.Sprintf("%d", validLines))
} 

// ルールを満たす条件をチェック
func hasInvalidChars(s string) bool {
	for _, c := range s {
		if !unicode.IsDigit(c) && c != ',' {
			return true
		}
	}
	return false
}

// 数字のみの整数をチェック
func isInteger(s string) bool {
	if len(s) == 0 {
		return false
	}
	for _, c := range s {
		if !unicode.IsDigit(c) {
			return false
		}
	}
	return true
}
