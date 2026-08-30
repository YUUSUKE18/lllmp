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

	// カンマで区切られた各要素を処理する
	parts := strings.Split(strings.TrimSpace(data), ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ":" で分割する
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}

		// 値と回数をパースする
		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue
		}

		// 合計と要素数を計算する
		totalSum += value * count
		totalCount += count
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
