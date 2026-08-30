package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当かを判定する
		// 1. カンマで分割する
		parts := strings.Split(line, ",")

		// 2. 少なくとも1つの要素があるか確認する（末尾のカンマのみの場合も含む）
		// 例: "1,2," -> ["1", "2", ""]
		// 例: "1," -> ["1", ""]
		// 例: "," -> ["", ""]
		
		// 妥当なのは、分割された要素の中に、数字として解釈できるものが1つ以上含まれている場合。
		// ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当。
		// 空の要素が複数ある場合、それは数字列ではないため、数字列が存在するかを確認する。

		hasNumber := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列であるかチェック
				_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
				if err == nil {
					hasNumber = true
				} else {
					// 数字以外のものが含まれている場合は妥当ではない
					hasNumber = false
					break
				}
			}
		}

		// 妥当な条件: 少なくとも1つの数字列が存在する
		if hasNumber {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
