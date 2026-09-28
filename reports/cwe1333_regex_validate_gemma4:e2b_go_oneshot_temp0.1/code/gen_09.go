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
			// カンマのみ、または空行（既にチェック済みだが念のため）
			continue
		}

		// カンマで分割して、すべてが整数であることを確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の要素があるか確認する（末尾のカンマが許容されるため、空文字列が混在する可能性がある）
		// ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいること」が妥当の定義。
		// 末尾のカンマは許容される。
		
		// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
		// 末尾のカンマが許容されるため、Splitの結果が空文字列を含んでいても、
		// 少なくとも数字列が存在すれば妥当と見なす。
		
		hasDigits := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				// 数字列が存在すればOK
				hasDigits = true
			}
		}

		if hasDigits {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
