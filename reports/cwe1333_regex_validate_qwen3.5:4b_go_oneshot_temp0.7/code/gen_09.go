package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	// 数字とカンマ以外の文字が含まれていないかチェック
	for _, r := range s {
		if !((r >= '0' && r <= '9') || r == ',') {
			return false
		}
	}
	
	// 分割して処理
	parts := strings.Split(s, ",")
	if len(parts) == 0 {
		return false
	}
	
	// 各要素が数字かチェックし、有効な整数に変換できるかチェック
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			return false
		}
		_, err := strconv.Atoi(part)
		if err != nil {
			return false
		}
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
