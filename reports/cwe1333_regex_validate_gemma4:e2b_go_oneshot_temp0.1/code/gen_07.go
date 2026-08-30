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
			// カンマのみ、または空行として扱われる場合（例: "," や " , "）
			// 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当。
			// 空の文字列はこれに該当しないため、妥当ではない。
			continue
		}

		// カンマで分割して、各要素が整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の数字列がカンマで区切られているかを確認する。
		// trimmedLineが空でない場合、少なくとも1つの要素（数字列）が存在する。
		// ただし、"1,2," のように末尾にカンマがあっても、Splitの結果は ["1", "2", ""] となる。
		// 妥当性の判定は、数字列が1つ以上存在し、それらが数字のみで構成されているか、という点に絞る。
		
		isValid := true
		for _, part := range parts {
			// 各部分が空でないことを確認する（末尾のカンマによる空文字列の発生を考慮）
			if part != "" {
				// 数字のみで構成されているか確認する
				if _, err := fmt.Sscanf(part, "%d", new(int)); err != nil {
					isValid = false
					break
				}
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
