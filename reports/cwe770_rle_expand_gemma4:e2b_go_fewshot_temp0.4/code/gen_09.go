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
		if part == "" {
			continue
		}
		// ":" で分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が整数として解析できるか確認
		value, errV := fmt.Sscanf(valueStr, "%d")
		count, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil {
			continue // 解析エラーがあれば無視
		}

		// 値と回数を整数に変換
		var valueInt int
		var countInt int
		fmt.Sscanf(valueStr, "%d", &valueInt)
		fmt.Sscanf(countStr, "%d", &countInt)

		// 回数が0以上であることを確認（仕様で保証されているが念のため）
		if countInt >= 0 {
			// 要素数と合計を計算
			totalCount += int64(countInt)
			totalSum += int64(valueInt) * int64(countInt)
		}
	}

	// 厳密に count=<要素数> sum=<合計> の1行を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
