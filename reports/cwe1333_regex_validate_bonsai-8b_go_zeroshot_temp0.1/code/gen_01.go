package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line := strings.TrimSpace(readLine)
		if line == "" {
			break
		}

		// パースして数字のみをチェック
		parts := strings.Split(line, ",")
		if len(parts) < 2 {
			continue
		}

		// パースして数字のみをチェック
		valid := true
		for _, part := range parts {
			if !isValid(part) {
				valid = false
				break
			}
		}

		if valid {
			validLines = append(validLines, line)
		}
	}

	// 最大の妥当行数を取得
	maxValid := len(validLines)
	if maxValid == 0 {
		fmt.Println("valid=0")
		return
	}

	// 最大の妥当行数を出力
	fmt.Printf("valid=%d\n", maxValid)
} 

// isValid checks if a string is a valid integer
func isValid(s string) bool {
	if s == "" {
		return false
	}

	// Check for optional leading sign
	if s[0] == '-' || s[0] == '+' {
		s = s[1:]
	}

	// Check if all characters are digits
	for _, c := range s {
		if !isdigit(c) {
			return false
		}
	}

	return true

// isdigit checks if a character is a digit
func isdigit(c rune) bool {
	return c >= '0' && c <= '9'
}
