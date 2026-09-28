package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var input string
	// 標準入力から1行読み込む
	if _, err := fmt.Scanln(&input); err != nil {
		// 入力が空の場合は何も出力しない（仕様上、空行が入力された場合の挙動は明記されていないが、ここでは処理を終了する）
		return
	}

	// カンマで分割して各要素を処理
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 値と回数をコロンで分割
		pair := strings.Split(strings.TrimSpace(part), ":")
		if len(pair) != 2 {
			continue // 形式が不正な場合はスキップ
		}

		// 値を整数に変換
		valueStr := strings.TrimSpace(pair[0])
		countStr := strings.TrimSpace(pair[1])

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue // 数値変換に失敗した場合はスキップ
		}

		// 要素数と合計を計算
		totalCount += count
		totalSum += value*count
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
