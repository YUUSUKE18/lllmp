package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func isLineValid(line string) bool {
	// 前後の空白を除去
	s := trimWhitespace(line)
	if s == "" {
		return false
	}

	// カンマ区切りの要素を取得（末尾のカンマも許容）
	parts := splitByComma(s)

	for _, part := range parts {
		part = trimWhitespace(part)
		if part == "" {
			return false
		}
		// 数字のみであるかチェック
		if _, err := strconv.Atoi(part); err != nil {
			return false
		}
	}

	return true
}

func trimWhitespace(s string) string {
	for len(s) > 0 && (s[0] == ' ' || s[len(s)-1] == ' ') {
		s = s[1 : len(s)-1]
		if len(s) == 0 {
			break
		}
	}
	return s
}

func splitByComma(s string) []string {
	result := make([]string, 0)
	start := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ',' {
			result = append(result, s[start:i])
			start = i + 1
		}
	}
	result = append(result, s[start:])
	return result
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		if isLineValid(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
