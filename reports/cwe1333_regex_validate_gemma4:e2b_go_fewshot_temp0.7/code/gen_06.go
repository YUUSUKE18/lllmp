package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを削除してチェックする
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空文字列（トリム後）は妥当ではない（空行チェックでカバーされるはずだが念のため）
			continue
		}

		// カンマで分割して、すべてが整数であることを確認する
		parts := strings.Split(trimmedLine, ",")
		isValid := true

		for _, part := range parts {
			if part == "" {
				// カンマが連続している場合（例: "1,,2" や "1," のように末尾のカンマがトリムされても空になるケース）
				// ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいる」ことを要求。
				// TrimRightで末尾のカンマを削除した後、残った文字列が空でないことを確認する。
				// ここでは、入力行が「数字とカンマ以外を含む」ことをチェックする。
				continue
			}

			// 数字列として有効かチェック
			_, err := fmt.Sscanf(part, "%d", new(int))
			if err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
