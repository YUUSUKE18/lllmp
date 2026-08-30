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

		if count > 0 {
			totalCount += int64(count)
			totalSum += int64(value) * int64(count)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
