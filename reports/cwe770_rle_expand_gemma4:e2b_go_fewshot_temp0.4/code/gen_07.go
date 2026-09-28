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

	parts := strings.Split(strings.TrimSpace(data), ",")
	var totalSum int64 = 0
	var totalCount int64 = 0

	for _, part := range parts {
		if part == "" {
			continue
		}
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		var value int64
		var count int64
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		_, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV == nil && errC == nil && count >= 0 {
			// 値:回数 の形式で解釈できた場合、値が count 回繰り返される
			totalSum += value * int64(count)
			totalCount += int64(count)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
