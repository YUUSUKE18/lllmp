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
	input, err := os.ReadFile(0) // os.ReadFile(0) は標準入力全体を読み込む
	if err != nil {
		// 入力エラーが発生した場合、処理を終了
		return
	}

	data := strings.TrimSpace(string(input))
	if data == "" {
		// 入力が空の場合は何もしない
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで区切って個々の要素ペアに分割する
	pairs := strings.Split(data, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, pair := range pairs {
		pair = strings.TrimSpace(pair)
		if pair == "" {
			continue
		}

		// コロンで分割して値と回数を取得する
		parts := strings.Split(pair, ":")
		if len(parts) != 2 {
			// 形式が不正な場合は無視する
			continue
		}

		valueStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])

		// 値と回数を int64 に変換する
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		// 変換エラーがあれば無視する
		if errV != nil || errC != nil {
			continue
		}

		// 要素数と合計を計算する
		// 要素数: value * count
		// 合計: value * count
		contribution := value * count
		totalCount += contribution
		totalSum += contribution
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
