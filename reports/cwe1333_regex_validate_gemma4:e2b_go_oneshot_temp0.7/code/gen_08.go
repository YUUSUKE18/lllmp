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
			// カンマのみ、または空行として扱われる場合 (元の行が" ," のような場合も含む)
			continue
		}

		// カンマで分割して、各要素が整数であるかを確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 少なくとも1つの要素があるかを確認する (trimmedLineが空でないため、partsは少なくとも1要素)
		if len(parts) == 0 {
			continue
		}

		isValid := true
		for _, part := range parts {
			// 各部分が空文字列でないことを確認し、整数に変換可能か確認する
			if part == "" {
				// カンマが連続している場合や、末尾のカンマが意図しない結果を生んだ場合を考慮
				// 仕様：「1個以上の数字列がカンマで区切られて並んでいる」
				// 末尾のカンマは許容されるが、実質的に数字列が存在する必要がある。
				// ここでは、スペースや非数字文字が混入しているかを厳しくチェックする。
				continue
			}
			_, err := fmt.Sscan(part) // Sscanは文字列をスキャンするが、ここでは単に存在チェックに使う
			if err != nil {
				isValid = false
				break
			}
		}

		// 妥当な行数のカウント
		if isValid {
			validCount++
		}
	}

	// 厳密に valid=<妥当な行数> を出力
	fmt.Printf("valid=%d\n", validCount)
}
