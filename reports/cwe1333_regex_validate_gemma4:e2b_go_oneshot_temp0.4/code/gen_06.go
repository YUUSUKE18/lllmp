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

		// 末尾のカンマを削除して、カンマ区切りの整数列として評価する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空文字列（トリム後）は妥当ではない
			continue
		}

		// カンマで分割して、すべてが整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		isValid := true
		for _, part := range parts {
			if part == "" {
				// 空の要素（例: "1,,2" の間のカンマ）は許容されるが、
				// ここでは「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
				// 空文字列の要素が複数あることは、カンマ区切りの列として許容されるかどうかの解釈が必要。
				// 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
				// 例: "1,2" -> ["1", "2"] (2個の数字列) -> 妥当
				// 例: "1,,2" -> ["1", "", "2"] (3個の要素、2つの数字列と1つの空文字列)
				// ここでは、各要素が数字列である必要があると解釈し、空文字列は許容しないとする。
				isValid = false
				break
			}
			_, err := fmt.Sscan(part)
			if err != nil {
				// 数字とカンマ以外を含む、または数字でない場合は妥当ではない
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
