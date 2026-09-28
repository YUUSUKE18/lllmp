package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	// 標準入力から一行読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーは無視するか、適切なエラー処理を行うが、ここでは単純化のため終了
		return
	}
	inputStr := string(input)

	// カンマで区切って個々の要素に分割
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// "値:回数" の形式に分割
		kv := strings.Split(strings.TrimSpace(part), ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合はスキップ
		}

		valueStr := kv[0]
		countStr := kv[1]

		// 値と回数を整数に変換
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue // 変換エラーがあればスキップ
		}

		// 合計と要素数を加算
		totalSum += value * count
		totalCount += count
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
