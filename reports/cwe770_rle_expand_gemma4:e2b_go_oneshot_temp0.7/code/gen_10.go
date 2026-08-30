package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, _ := os.ReadFile(0)
	data := string(input)

	parts := strings.Split(strings.TrimSpace(data), "\n")

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

		valueStr := kv[0]
		countStr := kv[1]

		// 値と回数を整数に変換
		value, errV := fmt.Sscanf(valueStr, "%d")
		count, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil {
			continue
		}

		var val int64
		var cnt int64
		_, errV = fmt.Sscanf(valueStr, "%d", &val)
		_, errC = fmt.Sscanf(countStr, "%d", &cnt)

		if errV != nil || errC != nil {
			continue
		}

		if cnt >= 0 {
			totalCount += int64(cnt)
			totalSum += int64(val) * int64(cnt)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
