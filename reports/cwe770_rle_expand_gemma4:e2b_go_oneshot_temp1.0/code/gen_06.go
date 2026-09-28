package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, _ := os.ReadFile(0)
	data := string(input)

	parts := strings.Split(strings.TrimSpace(data), "\n")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, line := range parts {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		// 値:回数 の形式で分割
		if parts := strings.Split(line, ":"); len(parts) != 2 {
			continue
		}

		valueStr := parts[0]
		countStr := parts[1]

		var value int64
		var count int64

		// 値と回数を整数に変換
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		_, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV != nil || errC != nil || count < 0 {
			continue
		}

		// 要素数を加算
		totalCount += int64(count)

		// 合計を計算 (値 * 回数)
		totalSum += int64(value) * int64(count)
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
