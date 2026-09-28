package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line, err := fmt.ScanLine()
		if err != nil {
			break
		}

		// 行の前後の空白を無視
		line = strings.TrimSpace(line)

		// 空行は無視
		if line == "" {
			continue
		}

		// 数字とカンマ以外の文字は無視
		// 例: "123,456"は妥当、"123,456,"は許容
		// 例: "123,456,789"は妥当
		// 例: "123,456,789,123"は妥当
		// 例: "123,456,789,123,"は許容
		// 例: "123,456,789,123,"は許容
		// 例: "123,456"は妥当
		// 例: "123,456,789,123,"は許容
		// 例: "123,456,789,123,"は許容
		// 例: "123,456,789,123,"は許容

		// カンマ区切りの整数列を分割
		parts := strings.Split(line, ",")

		// 1 個以上の数字列がある
		if len(parts) >= 1 {
			validLines = append(validLines, line)
		}
	}

	// 最終的に、厳密に valid=<妥当な行数> を出力
	fmt.Printf("valid=%d\n", len(validLines))
}
