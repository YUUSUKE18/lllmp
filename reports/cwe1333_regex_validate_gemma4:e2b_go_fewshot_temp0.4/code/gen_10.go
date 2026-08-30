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

		// 末尾のカンマがあっても良いので、カンマで分割してチェックする
		parts := strings.Split(line, ",")

		// 1個以上の数字列がカンマで区切られて並んでいるか、かつ数字とカンマ以外を含まないかを確認する
		isValid := true
		for _, part := range parts {
			// 各部分が空でなく、かつ数字のみで構成されているかを確認する
			if part == "" {
				// 末尾のカンマによる空要素は許容されるが、他の要素が数字でない場合は不適
				continue
			}
			if !isNumeric(part) {
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

// isNumeric は文字列がすべて数字のみで構成されているかをチェックする
func isNumeric(s string) bool {
	for _, r := range s {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}
