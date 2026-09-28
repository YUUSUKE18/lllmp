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

	// カンマで区切られた各要素を処理
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

		// 値が整数か確認
		var value int64
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		if errV != nil {
			continue // 値が整数でない場合は無視
		}

		// 回数が整数か確認
		var count int64
		_, errC := fmt.Sscanf(countStr, "%d", &count)
		if errC != nil {
			continue // 回数が整数でない場合は無視
		}

		// 回数が0以上であることを確認（仕様上は回数は0以上）
		if count >= 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
