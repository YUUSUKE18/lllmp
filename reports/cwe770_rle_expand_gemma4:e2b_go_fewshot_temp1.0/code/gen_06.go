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

	parts := strings.Split(data, ",")
	var totalCount int64 = 0
	var totalSum int64 = 0

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

		// 値と回数が整数としてパース可能か確認
		value, errV := fmt.Sscanf(valueStr, "%d")
		count, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil {
			continue
		}

		var val int
		var cnt int
		_, errV = fmt.Sscanf(valueStr, "%d", &val)
		_, errC = fmt.Sscanf(countStr, "%d", &cnt)

		if errV != nil || errC != nil {
			continue
		}

		// 回数が0以上であることを確認 (問題文で保証されているが念のため)
		if cnt >= 0 {
			totalCount += int64(val * cnt)
			totalSum += int64(val) * int64(cnt)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
