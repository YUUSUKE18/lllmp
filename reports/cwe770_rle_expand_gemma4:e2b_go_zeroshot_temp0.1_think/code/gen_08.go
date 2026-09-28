package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーが発生した場合（通常は想定されないが念のため）
		return
	}
	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	// カンマでトークンに分割する
	tokens := strings.Split(inputStr, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, token := range tokens {
		// トークンから値と回数を分割する
		parts := strings.Split(token, ":")
		if len(parts) != 2 {
			// 形式が不正な場合はスキップ
			continue
		}

		// 値と回数を int64 に変換する
		var value, count int64
		_, errV := fmt.Sscan(parts[0], &value)
		_, errC := fmt.Sscan(parts[1], &count)

		if errV != nil || errC != nil {
			// 変換エラーが発生した場合はスキップ
			continue
		}

		// 要素数（回数）を合計に加算する
		totalCount += count

		// 合計（値 * 回数）を合計に加算する
		totalSum += value * count
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
