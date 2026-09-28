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
	parts := strings.Split(strings.TrimSpace(data), ",")

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ":" で値と回数を分割
		if idx := strings.Index(part, ":"); idx != -1 {
			valueStr := part[:idx]
			countStr := part[idx+1:]

			var value int64
			var count int64

			// 値と回数を整数に変換
			_, errVal := fmt.Sscanf(valueStr, "%d", &value)
			_, errCount := fmt.Sscanf(countStr, "%d", &count)

			if errVal == nil && errCount == nil {
				// 要素数と合計を計算
				totalCount += int64(value) * int64(count)
			}
		}
	}

	// 実際には、入力が「値:回数」の形式で並んでいることを利用し、
	// 7:3,2:2 の例に従って、各 (値, 回数) のペアから要素数と合計を計算する必要があります。
	// 例: 7:3,2:2 は、(7, 3) と (2, 2) の2つのペアを意味します。
	// 7:3 -> 7が3回 -> 7, 7, 7
	// 2:2 -> 2が2回 -> 2, 2
	// 要素数: 3 + 2 = 5
	// 合計: 7*3 + 2*2 = 21 + 4 = 25

	totalCount = 0
	totalSum = 0

	// 再度、各要素を (値, 回数) のペアとして処理する
	for _, item := range parts {
		item = strings.TrimSpace(item)
		if item == "" {
			continue
		}

		if idx := strings.Index(item, ":"); idx != -1 {
			valueStr := item[:idx]
			countStr := item[idx+1:]

			var value int64
			var count int64

			// Sscanfを使って値と回数を取得
			_, errVal := fmt.Sscanf(valueStr, "%d", &value)
			_, errCount := fmt.Sscanf(countStr, "%d", &count)

			if errVal == nil && errCount == nil {
				// 要素数と合計を計算
				totalCount += count
				totalSum += value * count
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
