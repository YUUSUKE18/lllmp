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

	// カンマで分割して各ペアを取得
	pairs := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, pair := range pairs {
		if pair == "" {
			continue
		}

		parts := strings.Split(pair, ":")
		if len(parts) != 2 {
			continue // 値:回数 の形式でない場合は無視
		}

		// 値 (Value) の解析
		var valueStr string
		_, errV := fmt.Sscanf(parts[0], "%d", &valueStr)
		if errV != nil {
			continue // 値が整数でない場合は無視
		}
		value := 0
		fmt.Sscanf(parts[0], "%d", &value)

		// 回数 (Count) の解析
		var count int64
		_, errC := fmt.Sscanf(parts[1], "%d", &count)
		if errC != nil {
			continue // 回数が整数でない場合は無視
		}

		// 回数が0以上であることを確認（仕様で保証されているが念のため）
		if count >= 0 {
			totalCount += count
			totalSum += int64(value) * count
		}
	}

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
