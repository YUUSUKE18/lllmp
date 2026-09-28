package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isLineValid(line string) bool {
	// 行の前後の空白を無視する
	trimmed := strings.TrimSpace(line)

	// 空行は妥当ではない
	if len(trimmed) == 0 {
		return false
	}

	// 数字とカンマ以外を含む行は妥当ではない
	for _, r := range trimmed {
		if (r >= '0' && r <= '9') || r == ',' {
			continue
		}
		return false
	}

	// 1 個以上の数字列があること（つまり、少なくとも 1 つの数字が含まれていること）
	hasDigit := false
	for _, r := range trimmed {
		if r >= '0' && r <= '9' {
			hasDigit = true
			break
		}
	}

	return hasDigit
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		if isLineValid(scanner.Text()) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
