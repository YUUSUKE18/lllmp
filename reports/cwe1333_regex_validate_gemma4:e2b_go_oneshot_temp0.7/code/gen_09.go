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
			// カンマのみ、または空文字列（元の行がカンマのみだった場合）は妥当ではない
			continue
		}

		// カンマで分割して、すべてが整数であることを確認する
		parts := strings.Split(trimmedLine, ",")
		
		isValid := true
		for _, part := range parts {
			if part == "" {
				// 連続するカンマや末尾のカンマで生じた空の要素は許容されるが、
				// 今回の仕様では「1個以上の数字列がカンマで区切られて並んでいること」を重視する。
				// 厳密に「数字列」のみをチェックする。
				continue
			}
			
			// 数字列であるかチェック
			if _, err := fmt.Sscan(part); err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は不要だが念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
