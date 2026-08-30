package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var input string
	if _, err := fmt.Scanln(&input); err != nil {
		return
	}

	totalCount := int64(0)
	totalSum := int64(0)

	parts := strings.Split(input, ",")

	for _, part := range parts {
		if part == "" {
			continue
		}
		pair := strings.Split(part, ":")
		if len(pair) != 2 {
			continue
		}

		var value int64
		var count int64
		_, errV := fmt.Sscanf(pair[0], "%d", &value)
		_, errC := fmt.Sscanf(pair[1], "%d", &count)

		if errV == nil && errC == nil {
			totalCount += count
			totalSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
