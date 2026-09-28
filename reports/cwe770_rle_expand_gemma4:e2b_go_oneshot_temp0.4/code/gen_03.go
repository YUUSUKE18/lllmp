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

		var value int64
		var count int64
		_, errV := fmt.Sscanf(kv[0], "%d", &value)
		_, errC := fmt.Sscanf(kv[1], "%d", &count)

		if errV != nil || errC != nil {
			continue // 整数変換に失敗した場合はスキップ
		}

		// 値:回数 の形式で読み取った値と回数を加算
		totalCount += count
		totalSum += value * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
