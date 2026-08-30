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

		// 末尾のカンマを削除して、カンマ区切りの整数列として評価する
		trimmedLine := strings.TrimRight(line, ",")

		// 空文字列になった場合（例: "," や "" のみ）は妥当ではない
		if trimmedLine == "" {
			continue
		}

		// カンマで分割して、すべてが整数であることを確認する
		parts := strings.Split(trimmedLine, ",")
		isValid := true

		for _, part := range parts {
			// 各部分が空でなく、整数に変換可能か確認する
			if part == "" {
				// 末尾のカンマや連続するカンマによる空要素は許容されるが、
				// 厳密には「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすか確認する。
				// ここでは、数字列が少なくとも1つ存在すれば良いと解釈する。
				continue
			}

			// 整数であるか確認
			_, err := fmt.Sscanf(part, "%d", new(int))
			if err != nil {
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
