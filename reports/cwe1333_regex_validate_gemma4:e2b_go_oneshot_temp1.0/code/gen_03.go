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

		// 末尾のカンマを削除して、数字のリストを評価する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行の後にカンマのみの場合（例: "," や " , "）
			// 仕様に基づくと、数字列が1個以上ある必要があるため、これは妥当ではない。
			continue
		}

		// カンマで分割して、すべての要素が整数であることを確認する
		parts := strings.Split(trimmedLine, ",")
		isValid := true
		for _, part := range parts {
			// 各部分をトリムして整数に変換可能か確認
			if strings.TrimSpace(part) == "" {
				// カンマが連続している、または空の要素がある場合は、
				// それ自体が「数字列」として妥当ではないと見なす（仕様：1個以上の数字列がカンマで区切られている）
				isValid = false
				break
			}

			// 数字であるか確認
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
