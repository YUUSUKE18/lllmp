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
		
		// 少なくとも1つの要素が存在し、それらがすべて整数であることを確認する
		if len(parts) > 0 {
			isValid := true
			for _, part := range parts {
				// 各部分の前後にある空白を無視して整数に変換を試みる
				trimmedPart := strings.TrimSpace(part)
				if trimmedPart == "" {
					// カンマが連続している場合（例: "1,,2"）は、これは妥当な区切り方ではないと解釈する。
					// ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいる」なので、
					// 空の要素が混ざることを許容するかどうかを明確にする必要がある。
					// ここでは、数字列のみが区切りとして存在することを重視する。
					// 厳密に「数字列」のみを期待するなら、空の要素はNGとする。
					// ただし、例1の文脈から、カンマ区切りで数字が並んでいることを確認する。
					// 妥当な行は「1 個以上の数字列がカンマで区切られて並んでいる」こと。
					// したがって、空の要素は許容しない。
					isValid = false
					break
				}
				_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
				if err != nil {
					isValid = false
					break
				}
			}

			if isValid {
				validCount++
			}
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
