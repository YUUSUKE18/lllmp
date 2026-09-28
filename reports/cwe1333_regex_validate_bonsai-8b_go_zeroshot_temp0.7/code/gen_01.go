package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		var line string
		fmt.Scanln(&line)

		// 行が空か、あるいは数字とカンマ以外を含んでいるかをチェック
		if strings.TrimSpace(line) == "" || !strings.ContainsAll(line, "0123456789,") {
			continue
		}

		// カンマ区切りの整数列を分割
		parts := strings.Split(line, ",")

		// パーツのすべてが数字であるかをチェック
		isAllDigits := true
		for _, part := range parts {
			if !strings.AllN(func(c rune) bool { return c >= '0' && c <= '9' }, part) {
				isAllDigits = false
				break
			}
		}

		// 1 個以上の数字列があるかをチェック
		if isAllDigits && len(parts) >= 1 {
			validLines = append(validLines, line)
		}
	}

	// 最後に、検出した行数に応じて valid=<...> を出力
	fmt.Printf("valid=%d\n", len(validLines))
}
