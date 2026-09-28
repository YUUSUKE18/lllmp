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

		// 末尾のカンマは許容するが、全体が空でなければ数字とカンマのみで構成されている必要がある
		if len(line) == 0 {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを削除して、カンマ区切りの数字列として評価する
		trimmedLine := strings.TrimSuffix(line, ",")
		
		// カンマで分割して、すべてが整数であるかチェックする
		parts := strings.Split(trimmedLine, ",")
		
		isValid := true
		for _, part := range parts {
			if part == "" {
				// 区切り文字が連続している（例: ",," や末尾のカンマのみ）場合、これは許容されるかもしれないが、
				// 仕様「1 個以上の数字列がカンマで区切られて並んでいる」を満たすかを厳密に判断する。
				// 妥当とは、1個以上の数字列がカンマで区切られていること。
				// 空の要素（空文字列）が複数ある場合、それは意味のある数字列ではないため、妥当ではないと見なす。
				if len(parts) > 0 && line != "" { // 元の行が空でなければ、空の要素は不適格
					isValid = false
					break
				}
			}
			
			// 各部分が整数であるかチェック
			if _, err := fmt.Sscanf(part, "%d", new(int)); err != nil {
				// 整数に変換できない文字が含まれている場合
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
