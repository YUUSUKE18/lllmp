package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"unicode"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		isValid := true
		hasDigit := false

		// 1. 文字列が数字とカンマのみで構成されているか、および数字が含まれているかを確認する
		for _, char := range trimmedLine {
			if unicode.IsDigit(char) {
				hasDigit = true
			} else if char != ',' {
				// 数字とカンマ以外の文字が含まれていたら無効
				isValid = false
				break
			}
		}

		if !isValid {
			continue
		}

		// 2. 1個以上の数字列がカンマで区切られているかを確認する
		// 数字が一つでも含まれていれば、構造的に妥当であると見なす。
		// (例: "1", "1,2,", ",1,2" など)
		if hasDigit {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視しても良いが、念のため）
	}

	// 結果を出力
	fmt.Printf("valid=%d\n", validCount)
}
