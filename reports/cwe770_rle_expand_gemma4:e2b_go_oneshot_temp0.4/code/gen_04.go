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

	// カンマで区切られた各要素を処理
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

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が有効な整数であるか確認
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue
		}

		// 回数が0以上であることを確認（仕様上は0以上とあるが、念のため）
		if count >= 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
