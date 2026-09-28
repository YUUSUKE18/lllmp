package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	validCount := 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		// 1. 空行は妥当ではない
		if trimmedLine == "" {
			continue
		}

		isValid := true
		hasDigit := false

		// 2. 数字とカンマ以外を含む行を判定し、数字が存在するかを確認する
		for _, char := range trimmedLine {
			if char == ',' || (char >= '0' && char <= '9') {
				hasDigit = true
			} else {
				// 数字とカンマ以外を含む行は妥当ではない
				isValid = false
				break
			}
		}

		// 3. 1個以上の数字列がカンマで区切られて並んでいること（つまり数字が少なくとも1つあること）を判定する
		if isValid && hasDigit {
			validCount++
		}
	}

	// 4. 結果を出力
	fmt.Printf("valid=%d\n", validCount)
}
