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

	parts := strings.Split(strings.TrimSpace(data), "\n")
	if len(parts) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}

	totalCount := int64(0)
	totalSum := int64(0)

	for _, line := range parts {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		// カンマで分割して個々の要素を処理
		pairs := strings.Split(line, ",")
		for _, pair := range pairs {
			if pair == "" {
				continue
			}

			// ":" で分割して値と回数を取得
			kv := strings.Split(pair, ":")
			if len(kv) != 2 {
				continue // 形式が不正な場合は無視
			}

			valueStr := strings.TrimSpace(kv[0])
			countStr := strings.TrimSpace(kv[1])

			// 値と回数が有効な整数であるか確認
			value, errV := strconv.ParseInt(valueStr, 10, 64)
			count, errC := strconv.ParseInt(countStr, 10, 64)

			if errV != nil || errC != nil {
				continue // パースエラーの場合は無視
			}

			// 回数が0以上であることを確認
			if count >= 0 {
				totalCount += count
				totalSum += value * count
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
