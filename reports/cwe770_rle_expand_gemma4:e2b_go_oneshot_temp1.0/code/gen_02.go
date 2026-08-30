package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, _ := os.ReadFile(0)
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

		if errV == nil && errC == nil {
			totalCount += int64(value) * int64(count)
			totalSum += int64(value) * int64(count)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
