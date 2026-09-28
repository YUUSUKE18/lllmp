package main

import (
	"fmt"
	"strings"
	"os"
)

func main() {
	var validLines = []string{}

	for {
		line, err := os.Readline(os.Stdin)
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Fprintf(os.Stdout, "invalid\n")
			return
		}

		// 行末の空白を削除
		line = strings.TrimSpace(line)

		// 何れにも空行は無視
		if len(line) == 0 {
			continue
		}

		// 数値とカンマ以外のものを削除
		parts := strings.Split(line, ",")
		if len(parts) > 1 {
			// 空格が含まれた場合、分割した結果が空の部分を含む
			// すべての部品をチェック
			isValid := false
			for _, part := range parts {
				// 空格以外の数字のみを許可
				if part == "" {
					isValid = false
					break
				}
				if !strconv.Atoi(part) {
					isValid = false
					break
				}
			}
			if isValid {
				validLines = append(validLines, line)
			}
		}
	}

	// 最大の行数を判定
	maxValidLines := 0
	for _, line := range validLines {
		maxValidLines = max(maxValidLines, len(strings.Split(line, ",")))
	}

	// 最大の行数を持つ行のみを出力
	for _, line := range validLines {
		parts := strings.Split(line, ",")
		if len(parts) == maxValidLines {
			fmt.Printf("valid=%d\n", len(parts))
			break
		}
	}
}
