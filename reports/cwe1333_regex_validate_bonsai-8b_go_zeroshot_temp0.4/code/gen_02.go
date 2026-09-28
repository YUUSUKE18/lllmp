package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// stdinを読み込む
	input, err := stdio.ReadAll()
	if err != nil {
		fmt.Println("Invalid input")
		return
	}

	// 每行を処理
	for _, line := range strings.Split(input, "\n") {
		// 空行を無視
		if line == "" {
			continue
		}

		// 空格とカンマ以外の文字を除去
		trimmed := strings.TrimSpace(line)
		if !trimmed {
			continue
		}

		// カンマ区切りの整数列を分割
		parts := strings.Split(trimmed, ",")

		// パーツが1以上で、それぞれが数字である
		if len(parts) > 1 && allDigits := range parts {
			validLines = append(validLines, trimmed)
		}
	}

	// 最大の妥当行数を取得
	maxValid := len(validLines)

	// 最大の妥当行数の行を出力
	if maxValid > 0 {
		fmt.Printf("valid=%d\n", maxValid)
	} else {
		fmt.Println("valid=0")
	}
}
