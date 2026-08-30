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

		// 末尾のカンマを削除して、カンマ区切りの整数列として処理する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// 空行またはカンマのみの行は妥当ではない（仕様：1個以上の数字列がカンマで区切られて並んでいること）
			continue
		}

		// カンマで分割して、各要素が整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 妥当な行であるためには、少なくとも1つの数字列が存在する必要がある
		if len(parts) > 0 {
			isValid := true
			for _, part := range parts {
				// 各部分が空でないことを確認し、整数に変換可能か確認する
				if part == "" {
					// 末尾のカンマが許容されるため、最後の要素が空になることは許容されるが、
					// 厳密には「1個以上の数字列がカンマで区切られて並んでいる」必要がある。
					// ここでは、数字列が一つでも存在すればOKとする。
					continue
				}
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
	}

	fmt.Printf("valid=%d\n", validCount)
}
