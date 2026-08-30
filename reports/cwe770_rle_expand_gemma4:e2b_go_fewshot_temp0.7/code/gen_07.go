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
		// "値:回数" の形式で分割
		partsStr := strings.Split(strings.TrimSpace(part), ":")
		if len(partsStr) != 2 {
			continue // 形式が不正な場合は無視
		}

		var value int64
		var count int64
		_, errV := fmt.Sscanf(partsStr[0], "%d", &value)
		_, errC := fmt.Sscanf(partsStr[1], "%d", &count)

		if errV != nil || errC != nil {
			continue // 整数変換に失敗した場合は無視
		}

		// 回数が0以上であることを確認（問題文の制約により、通常は保証されるが念のため）
		if count >= 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
