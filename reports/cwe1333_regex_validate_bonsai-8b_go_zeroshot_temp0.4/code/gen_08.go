package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var validLines []string

	for {
		var line string
		fmt.Scanln(&line)

		// 空行または不適切な形式の行を処理
		if strings.TrimSpace(line) == "" {
			continue
		}

		// 数字とカンマ以外の文字をチェック
		for _, c := range line {
			if !strconv.IsDigit(c) && c != ',' {
				continue
			}
		}

		// カンマ区切りの整数列を分割
		parts := strings.Split(line, ',')

		// 1 個以上の数字列をチェック
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	// 最後に、適切な行数を出力
	fmt.Printf("valid=%d\n", len(validLines))
}
