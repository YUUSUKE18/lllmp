package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを削除して、カンマ区切りの整数列として処理する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空文字列（トリム後）は妥当ではない
			continue
		}

		// カンマで分割して、すべてが整数であることを確認する
		parts := strings.Split(trimmedLine, ",")
		isValid := true

		for _, part := range parts {
			if part == "" {
				// 空の要素（例: "1,,2" の中間）は許容しない（ただし、末尾のカンマは許容）
				// ここでは、数字列がカンマで区切られていることを確認したいので、
				// 空の要素は許容しないと解釈する。
				isValid = false
				break
			}
			// 各部分が整数であるか確認
			_, err := fmt.Sscanf(part, "%d", new(int))
			if err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、通常は考慮する
	}

	fmt.Printf("valid=%d\n", validCount)
}
