package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	totalCount := int64(0)
	totalSum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		keyValParts := strings.SplitN(part, ":", 2)
		if len(keyValParts) != 2 {
			continue
		}

		valStr := strings.TrimSpace(keyValParts[0])
		countStr := strings.TrimSpace(keyValParts[1])

		if valStr == "" || countStr == "" {
			continue
		}

		val, errVal := strconv.ParseInt(valStr, 10, 64)
		if errVal != nil {
			continue
		}

		count, errCount := strconv.ParseInt(countStr, 10, 64)
		if errCount != nil {
			continue
		}

		totalCount += count
		totalSum += val * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
