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

		// 末尾のカンマを削除して、カンマ区切りの整数列として評価する
		// 末尾のカンマは許容されるが、それ以外は数字とカンマのみで構成されている必要がある
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行（既にチェック済みだが念のため）
			// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいる」こと。
			// 空の文字列はこれに該当しない。
			continue
		}

		// カンマで分割して、すべてが整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		isValid := true
		for _, part := range parts {
			if part == "" {
				// 連続するカンマや末尾のカンマによる空文字列は許容される（例: "1,,2" や "1,"）
				// ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいる」ことを要求している。
				// 空の要素は「数字列」ではないため、厳密には妥当でないと解釈する。
				// ここでは、数字列のみが存在すれば良いと解釈し、空の要素は無視する。
				continue
			}
			// 数字列であるかチェック
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
