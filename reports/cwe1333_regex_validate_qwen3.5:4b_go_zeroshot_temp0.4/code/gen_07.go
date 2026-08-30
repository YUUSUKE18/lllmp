package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}

	parts := strings.Split(s, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			return false
		}
		// 整数の形式チェック: オプションのマイナス、数字のみ
		if len(part) == 0 || (part[0] != '-' && !isDigit(part[0])) {
			return false
		}
		for _, c := range part {
			if c < '0' || c > '9' {
				return false
			}
		}
	}
	return true
}

func isDigit(b byte) bool {
	return b >= '0' && b <= '9'
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		if isValidLine(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
