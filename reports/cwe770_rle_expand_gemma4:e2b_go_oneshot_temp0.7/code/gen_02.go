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
	
	// 正規表現のような処理で "値:回数" のペアを抽出する
	// カンマ区切りで区切る
	parts := strings.Split(strings.TrimSpace(data), "\n")
	
	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, line := range parts {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		
		// "値:回数" の形式で分割
		parts := strings.Split(line, ":")
		if len(parts) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])

		// 値と回数を整数に変換
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue // 変換エラーがあれば無視
		}

		if count > 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
