package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0
	lineNum := 0

	for sc.Scan() {
		line := sc.Text()
		lineNum++

		// 前後の空白を除去し、空行をチェック
		s := strings.TrimSpace(line)
		if s == "" {
			continue
		}

		parts := strings.Split(s, ",")
		validPart := true

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				validPart = false
				break
			}

			// 数字のみが含まれているか確認: 文字列が全て桁数であること
			numStr := part
			if numStr[0] == '-' {
				// 負の整数の場合、符号分岐を除く部分のみチェック
				numStr = part[1:]
			}

			for _, r := range numStr {
				if r < '0' || r > '9' {
					validPart = false
					break
				}
			}
			if !validPart {
				break
			}

			// 実際の整数値としてパースし、エラーがあるか確認（有効な数字かどうか）
			if _, err := strconv.Atoi(part); err != nil {
				validPart = false
				break
			}
		}

		if validPart {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
