package main

import (
	"bufio"
	"fmt"
)

func isLineValid(line string) bool {
	// 前後の空白を削除
	line = trim(line)

	if line == "" {
		return false
	}

	// 文字列をカンマで分割
	parts := splitByComma(line)

	// 各部分が整数かチェック
	for _, part := range parts {
		if !isInt(part) {
			return false
		}
	}

	return true
}

func trim(s string) string {
	start := 0
	end := len(s) - 1

	for start < end && (s[start] == ' ' || s[start] == '\t') {
		start++
	}

	for end > start && (s[end] == ' ' || s[end] == '\t') {
		end--
	}

	return s[:end+1-start]
}

func splitByComma(s string) []string {
	result := []string{}
	start := 0
	for i, r := range s {
		if r == ',' {
			result = append(result, s[start:i])
			start = i + 1
		}
	}
	if start < len(s) {
		result = append(result, s[start:])
	}
	return result
}

func isInt(s string) bool {
	for _, r := range s {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}

func main() {
	scanner := bufio.NewScanner(stdin)
	validCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		if isLineValid(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
