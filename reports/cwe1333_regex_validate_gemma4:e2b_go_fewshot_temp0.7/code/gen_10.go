package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを除去して、カンマ区切りの整数列として処理する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空白のみの場合（例: "," または " , " など）
			// 妥当ではないと判定する（空行と区別するため）
			continue
		}

		// カンマで分割して、すべてが整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		isValid := true
		for _, part := range parts {
			// 各部分が空でなく、かつ整数であるかを確認する
			if strings.TrimSpace(part) == "" {
				// カンマが連続している場合（例: "1,,2"）、これは妥当な整数列の区切りではない
				isValid = false
				break
			}
			if _, err := fmt.Sscanf(part, "%d", new(int)); err != nil {
				// 整数でない文字が含まれている場合
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
