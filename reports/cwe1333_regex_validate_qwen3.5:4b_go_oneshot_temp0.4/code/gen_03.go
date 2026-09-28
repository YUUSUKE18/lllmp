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
	
	// 空白文字が含まれていないか確認
	for _, r := range s {
		if r != ' ' && r != ',' && (r < '0' || r > '9') {
			return false
		}
	}

	parts := strings.Split(s, ",")
	
	// 空文字列が含まれていないか確認（カンマの連続や端にカンマが来る場合など）
	for _, p := range parts {
		if p == "" {
			return false
		}
	}

	// 各部分が整数であるか確認
	for _, p := range parts {
		n, err := strconv.Atoi(p)
		if err != nil {
			return false
		}
		_ = n // 使用しないため無効化
	}

	return true
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	
	for sc.Scan() {
		line := sc.Text()
		if isValidLine(line) {
			validCount++
		}
	}
	
	fmt.Printf("valid=%d\n", validCount)
}
