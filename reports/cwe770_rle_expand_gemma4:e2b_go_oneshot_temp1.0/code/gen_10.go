package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	input := scanner.Text()

	// カンマで分割して各要素を処理
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 値と回数をコロンで分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // フォーマットが不正な場合は無視
		}

		// 値を整数に変換
		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		value, errVal := strconv.ParseInt(valueStr, 10, 64)
		count, errCount := strconv.ParseInt(countStr, 10, 64)

		if errVal != nil || errCount != nil {
			continue // パースエラーがあれば無視
		}

		// 回数が0以上であることを確認
		if count >= 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	// 1行だけ出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
