package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	input, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		// エラー処理（通常、競技プログラミング環境では無視されることが多いが、念のため）
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
		// トークンから値と回数を分離する
		parts := strings.Split(strings.TrimSpace(token), ":")

		if len(parts) != 2 {
			// 形式が不正な場合は無視する
			continue
		}

		valueStr := parts[0]
		countStr := parts[1]

		// 値と回数を整数に変換する
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			// 変換エラーが発生した場合は無視する
			continue
		}

		// 計算に加算する
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
