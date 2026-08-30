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
			// カンマのみ、または空行（既にチェック済みだが念のため）
			continue
		}

		// カンマで分割して、すべてが整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の要素があるか確認する（末尾のカンマが許容されるため、空文字列が混在する可能性がある）
		// ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいる」なので、
		// 少なくとも1つの数字列が存在すれば良い。
		
		hasNumber := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列として存在する
				hasNumber = true
				// さらに、その部分が整数であることを確認する（ここでは、数字のみで構成されているかを確認する）
				if _, err := fmt.Sscanf(trimmedPart, "%d", new(int)); err == nil {
					// 整数としてパースできた
				} else {
					// 数字以外の文字が含まれている場合（例: "a,1"）は妥当ではない
					hasNumber = false // 厳密には、数字列のみで構成されている必要がある
					break
				}
			}
		}

		if hasNumber {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
