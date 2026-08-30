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

		// 末尾のカンマを除去して、カンマ区切りの整数列として評価する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// 行がカンマのみ、または空行に相当する場合（例: "," や ""）
			// 仕様では「1個以上の数字列がカンマで区切られて並んでいる」必要があるため、
			// 空の数字列は妥当ではないと判断する。
			continue
		}

		// カンマで分割し、各要素が整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の数字列がカンマで区切られて並んでいることを確認する
		// trimmedLineが空でなければ、少なくとも1つの要素は存在する。
		// 厳密に「数字列」をチェックする。
		isValid := true
		for _, part := range parts {
			if part == "" {
				// カンマが連続している場合（例: "1,,2" や ",1" のようなケース）
				// trimmedLineが空でなければ、これは不正な区切り方と見なす。
				isValid = false
				break
			}
			// 各部分が整数であることを確認する（文字列として評価する）
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
