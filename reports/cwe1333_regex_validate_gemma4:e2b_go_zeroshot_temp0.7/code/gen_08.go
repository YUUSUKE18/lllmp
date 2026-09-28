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

		// 末尾のカンマを除去して、残りの文字列を分割
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、またはカンマと空白のみの場合（例: "," や ",,"）
			// 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当。
			// 空の数字列は許容されない。
			continue
		}

		// カンマで分割して、各要素が数字列であるか確認する
		parts := strings.Split(trimmedLine, ",")
		isValid := true
		for _, part := range parts {
			if part == "" {
				// 空の要素は許容されない (例: "1,,2" の中の空要素)
				isValid = false
				break
			}
			// 各部分が整数列であるか確認
			_, err := fmt.Sscanf(part, "%d", new(int))
			if err != nil {
				// 数字以外の文字が含まれている場合
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、通常は考慮される
	}

	fmt.Printf("valid=%d\n", validCount)
}
