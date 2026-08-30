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

		// 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当かを判定する
		// 1. カンマで分割する
		parts := strings.Split(line, ",")

		// 2. 少なくとも1つの要素があるか確認する（末尾のカンマのみの場合は要素が1つになる）
		// 例: "1,2," -> ["1", "2", ""]
		// 例: "1," -> ["1", ""]
		// 例: "," -> ["", ""]
		// 例: "" -> [""] (これは既に空行で除外されている)

		// 妥当なのは、カンマで区切られた後に少なくとも1つの数字列が存在する場合。
		// 末尾のカンマは許容されるため、Splitの結果が空文字列を含んでいても、
		// 少なくとも1つの非空の要素があれば妥当とみなす。
		isValid := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				isValid = true
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、通常は考慮する
	}

	fmt.Printf("valid=%d\n", validCount)
}
