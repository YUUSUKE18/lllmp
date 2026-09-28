package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isDigit(r rune) bool {
	return r >= '0' && r <= '9'
}

func isValidLine(line string) bool {
	// 空行は妥当ではありません
	if len(line) == 0 {
		return false
	}

	// 数字とカンマ以外を含む行は妥当ではありません
	for _, r := range line {
		if !isDigit(r) && r != ',' {
			return false
		}
	}

	// 1 個以上の数字列があること (末尾のカンマは許容するが、数字がないとダメ)
	hasDigit := false
	for _, r := range line {
		if isDigit(r) {
			hasDigit = true
			break
		}
	}
	if !hasDigit {
		return false
	}

	// 数字列がカンマで区切られて並んでいる (先頭が数字、連続したカンマなし)
	for i := 0; i < len(line)-1; i++ {
		if line[i] == ',' && line[i+1] == ',' {
			return false
		}
	}

	// 先頭が数字であること (カンマで始まるのはダメ)
	if !isDigit(line[0]) {
		return false
	}

	return true
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if isValidLine(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
