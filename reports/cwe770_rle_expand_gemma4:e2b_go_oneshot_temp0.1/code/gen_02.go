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

	// カンマで区切って個々の要素に分割
	parts := strings.Split(strings.TrimSpace(data), ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		if part == "" {
			continue
		}
		// 値と回数をコロンで分割
		kv := strings.Split(strings.TrimSpace(part), ":")
		if len(kv) != 2 {
			continue
		}

		valueStr := kv[0]
		countStr := kv[1]

		// 値と回数を整数に変換
		value, errV := fmt.Sscanf(valueStr, "%d")
		count, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil {
			continue
		}

		var valueInt, countInt int64
		fmt.Sscanf(valueStr, "%d", &valueInt)
		fmt.Sscanf(countStr, "%d", &countInt)

		// 要素数と合計を計算
		totalCount += countInt
		totalSum += valueInt * countInt
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
