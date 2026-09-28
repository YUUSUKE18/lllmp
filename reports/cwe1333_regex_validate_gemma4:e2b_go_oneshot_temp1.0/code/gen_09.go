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

		// 末尾のカンマがあっても良いので、カンマで分割してチェックする
		// 妥当な行は「1 個以上の数字列がカンマで区切られて並んでいる」こと。
		// これは、カンマで区切られた後に、少なくとも一つの数字列が存在すれば良いことを意味する。

		// 行全体をカンマで分割してみる
		parts := strings.Split(line, ",")

		// 末尾のカンマがあっても良いので、最後に空文字列が残る可能性を考慮する。
		// 例: "1,2," -> ["1", "2", ""]

		hasNumber := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列であるかを確認
				if _, err := fmt.Sscanf(trimmedPart, "%d", new(int)); err == nil {
					hasNumber = true
				} else {
					// 数字列でなければ不妥当
					hasNumber = false
					break
				}
			}
		}

		// 妥当であるためには、数字列が1個以上存在する必要がある。
		if hasNumber {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
