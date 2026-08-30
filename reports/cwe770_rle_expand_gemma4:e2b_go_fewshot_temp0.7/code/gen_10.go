package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	// 入力をカンマで分割して個々の要素を処理する
	parts := strings.Split(data, ",")

	var totalSum int64 = 0
	var totalCount int64 = 0

	for _, part := range parts {
		// 各部分から "値:回数" の形式をパースする
		kv := strings.Split(strings.TrimSpace(part), ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		var value int64
		var count int64
		_, errVal := fmt.Sscanf(kv[0], "%d", &value)
		_, errCount := fmt.Sscanf(kv[1], "%d", &count)

		if errVal != nil || errCount != nil {
			continue // 整数への変換に失敗した場合は無視
		}

		if count > 0 {
			// 要素数と合計を計算する
			totalCount += count
			totalSum += value * count
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
