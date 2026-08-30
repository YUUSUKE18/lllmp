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
			continue
		}

		// 末尾のカンマを削除して、カンマで分割する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// 空の文字列（カンマのみ、または完全に空行をトリムした結果）は妥当ではない（ただし、仕様上は空行は妥当ではない）
			continue
		}

		// カンマで分割
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定：1個以上の数字列がカンマで区切られていること。
		// partsが空でないこと、そして各要素が数字列であるかを確認する。
		// 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」を求めている。
		// これは、カンマで区切られた結果、少なくとも1つの要素が存在し、その要素が数字列で構成されていることを意味する。

		isValid := true
		for _, part := range parts {
			// 各部分が空でないことを確認する
			if part == "" {
				// 末尾のカンマが許容されるため、最後の要素が空になることは許容されるが、
				// ここでは「数字列」が区切られていることを重視する。
				// 厳密に「1個以上の数字列」が区切られていることを確認する。
				// 例: "1,2," -> ["1", "2", ""]
				// "1,2" -> ["1", "2"]
				// "1,,2" -> ["1", "", "2"] (これは不妥当と見なすべきか？)

				// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
				// 空の文字列（""）は数字列ではないため、空要素が含まれていたら不妥当とする。
				// ただし、末尾のカンマは許容されるため、最後の要素が空になるのは許容される。
				// ここでは、数字列として扱われるべき要素が一つ以上存在するかどうかを判定する。
				continue
			}

			// partが完全に整数であることを確認する
			_, err := fmt.Sscanf(part, "%d", new(int))
			if err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			// 少なくとも1つの有効な要素（数字列）が存在すれば妥当
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
