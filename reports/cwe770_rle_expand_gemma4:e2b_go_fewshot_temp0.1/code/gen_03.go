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

	var totalCount int64 = 0
	var totalSum int64 = 0

	// カンマで区切って各要素を処理
	parts := strings.Split(data, ",")

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ":" で分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		// 値と回数をパース
		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値が整数であり、回数が存在する場合のみ処理
		if valueStr != "" && countStr != "" {
			value, errV := fmt.Sscanf(valueStr, "%d", &value)
			count, errC := fmt.Sscanf(countStr, "%d", &count)

			if errV == nil && errC == nil {
				// 値:回数 の形式で、値が整数、回数が整数であることを確認
				if value >= 0 && count >= 0 {
					totalCount += int64(count)
					totalSum += int64(value) * int64(count)
				}
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
