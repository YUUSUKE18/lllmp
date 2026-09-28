package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	var totalCount int64 = 0
	var totalSum int64 = 0

	content, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	parts := strings.Split(string(content), ",")

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
		if errCount != nil {
			continue
		}

		if count < 0 {
			continue
		}

		totalCount += count
		totalSum += val * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
