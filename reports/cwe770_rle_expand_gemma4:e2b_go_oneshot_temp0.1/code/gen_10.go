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

	// カンマで区切って個々の要素に分割
	parts := strings.Split(data, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		if part == "" {
			continue
		}
		// 値と回数をコロンで分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}

		// 値を整数に変換
		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		value, err1 := strconv.ParseInt(valueStr, 10, 64)
		count, err2 := strconv.ParseInt(countStr, 10, 64)

		if err1 != nil || err2 != nil {
			continue
		}

		// 要素数と合計を計算
		totalCount += count
		totalSum += value * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
