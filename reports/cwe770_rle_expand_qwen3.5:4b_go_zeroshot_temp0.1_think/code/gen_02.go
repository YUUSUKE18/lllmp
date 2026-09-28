package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var totalCount int64 = 0
	var totalSum int64 = 0

	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}

			idx := strings.Index(part, ":")
			if idx == -1 {
				continue
			}

			valStr := strings.TrimSpace(part[:idx])
			countStr := strings.TrimSpace(part[idx+1:])

			val, errVal := strconv.ParseInt(valStr, 10, 64)
			if errVal != nil {
				continue
			}

			count, errCount := strconv.ParseInt(countStr, 10, 64)
			if errCount != nil || count < 0 {
				continue
			}

			totalCount += count
			totalSum += val * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
