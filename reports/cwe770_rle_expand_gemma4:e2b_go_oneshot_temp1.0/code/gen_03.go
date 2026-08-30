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
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(data, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		if part == "" {
			continue
		}
		pair := strings.Split(part, ":")
		if len(pair) != 2 {
			continue
		}

		valueStr := strings.TrimSpace(pair[0])
		countStr := strings.TrimSpace(pair[1])

		var value int64
		var count int64

		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		_, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV != nil || errC != nil {
			continue
		}

		// 値:回数 の形式で読み込まれた値と回数を加算
		totalCount += int64(value) * int64(count)
		totalSum += int64(value) * int64(count)
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
