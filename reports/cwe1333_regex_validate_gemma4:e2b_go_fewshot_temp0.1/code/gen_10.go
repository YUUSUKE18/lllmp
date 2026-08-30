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

		// 末尾のカンマを許容しつつ、数字とカンマ以外を含まないかチェックする
		// 妥当な形式: 1個以上の数字列がカンマで区切られている。末尾のカンマは許容。
		// これは、文字列がカンマと数字のみで構成されていることを意味する。
		// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」をチェックする。

		// 1. 末尾のカンマを削除してチェックする
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// 行がカンマのみ（例: "," または ",,"）の場合、これは妥当ではない（数字列が0個）
			continue
		}

		// 2. trimmedLineが数字とカンマのみで構成されているかチェックする
		isValidFormat := true
		for _, char := range trimmedLine {
			if char != '-' && char != '0' && char != '1' && char != '2' && char != '3' && char != '4' && char != '5' && char != '6' && char != '7' && char != '8' && char != '9' && char != ',' {
				isValidFormat = false
				break
			}
		}

		if !isValidFormat {
			continue
		}

		// 3. 妥当な行としてカウントする
		// 1個以上の数字列がカンマで区切られている必要がある。
		// これは、カンマで分割した結果、空でない要素が1つ以上あることを意味する。
		parts := strings.Split(line, ",")
		count := 0
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				count++
			}
		}

		if count >= 1 {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
