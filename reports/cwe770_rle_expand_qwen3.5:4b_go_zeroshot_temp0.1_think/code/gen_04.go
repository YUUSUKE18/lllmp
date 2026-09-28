package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	var input string
	data, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}
	input = strings.TrimSpace(string(data))

	// Replace newlines with space to handle potential multiline tokens gracefully
	input = strings.ReplaceAll(input, "\n", " ")
	input = strings.ReplaceAll(input, "\r", " ")

	parts := strings.Split(input, ",")

	totalCount := int64(0)
	totalSum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		idx := strings.Index(part, ":")
		if idx == -1 {
			continue
		}

		valStr := part[:idx]
		countStr := part[idx+1:]

		valStr = strings.TrimSpace(valStr)
		countStr = strings.TrimSpace(countStr)

		if valStr == "" || countStr == "" {
			continue
		}

		val, errVal := strconv.ParseInt(valStr, 10, 64)
		count, errCount := strconv.ParseInt(countStr, 10, 64)

		if errVal != nil || errCount != nil {
			continue
		}

		totalCount += count
		totalSum += val * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
