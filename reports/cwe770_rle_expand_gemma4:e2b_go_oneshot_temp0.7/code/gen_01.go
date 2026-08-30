package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var input string
	// 標準入力から一行読み込む
	if _, err := fmt.Scanln(&input); err != nil && input == "" {
		// 入力が空の場合は終了
		return
	}

	// カンマで分割して個々の "値:回数" を取得
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		if part == "" {
			continue
		}
		// ":" で分割して値と回数を取得
		pair := strings.Split(part, ":")
		if len(pair) != 2 {
			continue // 形式が不正な場合は無視
		}

		var value int64
		var count int64
		_, errV := fmt.Sscanf(pair[0], "%d", &value)
		_, errC := fmt.Sscanf(pair[1], "%d", &count)

		if errV == nil && errC == nil && count >= 0 {
			// 要素数と合計を計算
			totalCount += count
			totalSum += value * count
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
