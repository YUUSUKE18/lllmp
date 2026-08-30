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

	// カンマで分割して各要素を処理
	parts := strings.Split(data, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// ": " で分割して値と回数を取得
		keyValue := strings.Split(strings.TrimSpace(part), ":")
		if len(keyValue) != 2 {
			continue // フォーマットが不正な場合は無視
		}

		valueStr := strings.TrimSpace(keyValue[0])
		countStr := strings.TrimSpace(keyValue[1])

		// 値と回数が整数として有効か確認
		value, err1 := fmt.Sscanf(valueStr, "%d", new(int))
		count, err2 := fmt.Sscanf(countStr, "%d", new(int))

		if err1 != nil || err2 != nil {
			continue // 整数に変換できない場合は無視
		}

		valueInt := 0
		countInt := 0
		fmt.Sscanf(valueStr, "%d", &valueInt)
		fmt.Sscanf(countStr, "%d", &countInt)


		// 要素数と合計を計算
		if countInt > 0 {
			totalCount += int64(countInt)
			totalSum += int64(valueInt) * int64(countInt)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
