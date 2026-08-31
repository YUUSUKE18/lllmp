package main

import (
	"bufio"
	"fmt"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil {
		os.Exit(1)
	}

	count := int64(0)
	sum := int64(0)

	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		
		pairs := strings.Split(part, ":")
		if len(pairs) != 2 {
			continue
		}

		valStr := strings.TrimSpace(pairs[0])
		countStr := strings.TrimSpace(pairs[1])

		if valStr == "" || countStr == "" {
			continue
		}

		val, errVal := strconv.ParseInt(valStr, 10, 64)
		countNum, errCount := strconv.ParseInt(countStr, 10, 64)

		if errVal != nil || errCount != nil {
			continue
		}

		if countNum < 0 {
			continue
		}

		count += countNum
		sum += val * countNum
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
