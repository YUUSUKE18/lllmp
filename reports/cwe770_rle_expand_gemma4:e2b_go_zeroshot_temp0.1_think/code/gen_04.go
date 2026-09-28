package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	input := scanner.Text()

	// カンマで区切って各ランレングスペアを分割する
	pairs := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, pair := range pairs {
		// 空のペアをスキップ
		if strings.TrimSpace(pair) == "" {
			continue
		}

		// 値と回数をコロンで分割する
		parts := strings.Split(pair, ":")
		if len(parts) != 2 {
			// 形式が不正な場合はスキップ
			continue
		}

		// 値 (Value) を取得し、回数 (Count) を取得する
		valueStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])

		// 数値に変換する
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		// 変換に失敗した場合はスキップ
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
