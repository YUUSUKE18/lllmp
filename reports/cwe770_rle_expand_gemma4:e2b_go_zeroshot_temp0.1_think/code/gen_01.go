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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力がない場合は終了
		return
	}
	input := scanner.Text()

	// カンマで区切って要素を分割する
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 空の要素をスキップ
		if strings.TrimSpace(part) == "" {
			continue
		}

		// 値と回数をコロンで分割する
		pair := strings.Split(part, ":")
		if len(pair) != 2 {
			// 形式が不正な場合はスキップ
			continue
		}

		// 値と回数を整数に変換する
		valueStr := strings.TrimSpace(pair[0])
		countStr := strings.TrimSpace(pair[1])

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		// 変換エラーがあればスキップ
		if errV != nil || errC != nil {
			continue
		}

		// 計算に加算する
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
