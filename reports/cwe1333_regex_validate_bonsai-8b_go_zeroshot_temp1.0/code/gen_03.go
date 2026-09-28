package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// サンプル入力は stdinから読み取る
	input := strings.NewReader(os.Stdin)

	for input.Read() {
		line := strings.TrimSpace(input.Text())
		if line == "" {
			continue
		}

		// 数字とカンマ以外の行は無視
		if !isNumericAndCommaOnly(line) {
			continue
		}

		// カンマで区切られた数字列がある
		parts := strings.Split(line, ",")
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	// 最終出力
	fmt.Printf("valid=%d\n", len(validLines))
} 

func isNumericAndCommaOnly(s string) bool {
	for _, c := range s {
		if c < '0' || c > '9' || c != ',' {
			return false
		}
	}
	return true
}
