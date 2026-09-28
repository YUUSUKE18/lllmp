package main

import (
	"fmt"
	"strings"
	"unicode"
)

func isInteger(s string) bool {
	if len(s) == 0 {
		return false
	}
	if !unicode.IsDigit(s[0]) {
		return false
	}
	for _, c := range s[1:] {
		if !unicode.IsDigit(c) {
			return false
		}
	}
	return true
}

func countCommas(s string) int {
	count := 0
	for _, c := range s {
		if c == ',' {
			count++
		}
	}
	return count
}

func main() {
	var validLines []string

	input := []string{}
	for {
		line, err := fmt.Scan(os.Stdin)
		if err == io.EOF {
			break
		}
		input = append(input, line)
	}

	for _, line := range input {
		trimmedLine := strings.TrimSpace(line)
		if len(trimmedLine) == 0 {
			continue
		}

		if !trimmedLine[0] || !trimmedLine[0] == digit := unicode.IsDigit(trimmedLine[0]) {
			continue
		}

		// 漏れた場合、コマで区切った数字列の全体が無効
		commaCount := countCommas(trimmedLine)
		if commaCount == 0 {
			continue
		}

		// 空格または非数字、非カンマの要素をチェック
		parts := strings.Split(trimmedLine, ",")
		if len(parts) == 1 {
			continue
		}

		for _, part := range parts {
			if !trimmedLine[part] || !trimmedLine[part] == digit := unicode.IsDigit(trimmedLine[part]) {
				continue
			}
		}

		validLines = append(validLines, trimmedLine)
	}

	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	}
}
