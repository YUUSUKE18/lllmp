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
			// カンマのみ、または空行として扱われる場合（例: "," や " , "）
			// 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当。
			// 空の文字列はこれに該当しないため、妥当ではないとする。
			continue
		}

		// カンマで分割して、すべてが整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		isValid := true

		for _, part := range parts {
			// 各部分が空でないことを確認し、整数に変換可能か確認する
			if part == "" {
				// 末尾のカンマが許容されるが、内部のカンマが連続している場合や、
				// 意図しない空文字列が発生した場合は注意が必要。
				// ここでは、数字列がカンマで区切られていることを確認する。
				// 例: "1,,2" のようなケースは、Splitの結果に空文字列が含まれる。
				// ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいる」なので、
				// 連続するカンマや前後の空白は無視して、数字のみが並んでいることを確認する。
				continue
			}

			// 数字としてパースできるか確認
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

	fmt.Printf("valid=%d\n", validCount)
}
