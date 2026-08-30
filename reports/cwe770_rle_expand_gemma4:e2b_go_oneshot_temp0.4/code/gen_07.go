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
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ":" で分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}

		// 値と回数をパース
		valueStr := kv[0]
		countStr := kv[1]

		value, errV := fmt.Sscanf(valueStr, "%d")
		count, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil {
			continue
		}

		var valueInt, countInt int
		fmt.Sscanf(valueStr, "%d", &valueInt)
		fmt.Sscanf(countStr, "%d", &countInt)

		value64 := int64(valueInt)
		count64 := int64(countInt)

		// 要素数と合計を計算
		totalCount += count64
		totalSum += value64
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
