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
		// 各要素の前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// ":" で分割
		kv := strings.Split(trimmedPart, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		// 値と回数をパース
		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue // パースエラーの場合は無視
		}

		// 要素数と合計を計算
		totalCount += count
		totalSum += value * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
