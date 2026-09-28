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
			// カンマのみ、または空行がトリム後に残った場合（例: "," や " , " など）
			// 仕様では「1 個以上の数字列がカンマで区切られて並んでいる」必要があるため、
			// 数字列が存在しない場合は妥当ではないとする。
			continue
		}

		// カンマで分割して、すべてが整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の数字列がカンマで区切られているかを確認する。
		// trimmedLineが空でない限り、少なくとも1つの要素は存在する。
		// ただし、"1,2,3" -> ["1", "2", "3"] (長さ3)
		// ",," -> "" (これは上記で除外されるか、次の処理で確認)
		
		isValid := true
		for _, part := range parts {
			if part == "" {
				// 連続するカンマや末尾のカンマによって空の要素が生成された場合
				// 例: "1,,2" -> ["1", "", "2"]
				// 末尾のカンマは許容されるが、空の要素は許容されない。
				// ただし、元の行が "1,2," の場合、trimmedLine は "1,2" となり、parts は ["1", "2"]。これは妥当。
				// 元の行が "1,,2" の場合、trimmedLine は "1,,2" のまま。
				// 厳密に「カンマで区切られて並んでいる」ことを確認する。
				// 妥当なのは、数字列がカンマで区切られている場合のみ。
				isValid = false
				break
			}
			// 数字列であることを確認
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
