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

		// 末尾のカンマを除去した後の文字列をチェック
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行として扱われる（ただし、空行は既に除外済み）
			// 厳密には「1個以上の数字列がカンマで区切られて並んでいる」必要があるため、
			// カンマのみの行は妥当ではないと判断する。
			continue
		}

		// カンマで分割して、各要素が数字列のみで構成されているかチェックする
		parts := strings.Split(trimmedLine, ",")
		isValid := true

		for _, part := range parts {
			if part == "" {
				// 連続するカンマや末尾のカンマによる空文字列は許容されるが、
				// 妥当な行の定義「1個以上の数字列がカンマで区切られて並んでいる」に照らすと、
				// 空の要素は許容されない可能性がある。
				// 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
				// 例: "1,2," -> parts=["1", "2", ""]。これは妥当と見なすか？
				// 「末尾のカンマは許容します」という記述から、末尾のカンマは無視して良い。
				// したがって、空の要素は許容されるが、数字列ではないものは許容されない。
				continue
			}

			// 各部分が完全に整数であるかチェック
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
