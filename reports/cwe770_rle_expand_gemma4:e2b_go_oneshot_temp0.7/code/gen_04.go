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

	// カンマで区切って各要素を処理
	parts := strings.Split(data, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 値と回数をコロンで分割
		kv := strings.Split(strings.TrimSpace(part), ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合はスキップ
		}

		// 値を整数に変換
		var value int64
		_, err := fmt.Sscanf(kv[0], "%d", &value)
		if err != nil {
			continue // 値が整数でない場合はスキップ
		}

		// 回数を整数に変換
		var count int64
		_, err = fmt.Sscanf(kv[1], "%d", &count)
		if err != nil {
			continue // 回数が整数でない場合はスキップ
		}

		// 要素数と合計を計算
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
