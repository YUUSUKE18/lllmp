package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを削除して、数字のみの文字列を取得
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空文字列になってしまった場合 (例: ",," や ",")
			// ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいる」が妥当。
			// 空行は妥当ではないため、ここでは妥当ではないと判定する。
			continue
		}

		// カンマで分割して、すべてが数字であることを確認する
		parts := strings.Split(line, ",")
		isValid := true
		for _, part := range parts {
			if strings.TrimSpace(part) == "" {
				// カンマが連続している場合（例: "1,,2"）は妥当とみなす（末尾のカンマは許容されるため）
				continue
			}
			if _, err := fmt.Sscanf(part, "%d", new(int)); err != nil {
				// 数字以外の文字が含まれている場合
				isValid = false
				break
			}
		}

		if isValid {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
