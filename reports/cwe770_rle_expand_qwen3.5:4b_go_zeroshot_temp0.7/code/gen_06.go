package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(strings.NewReader(""))
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	parts := strings.Split(line, ",")
	count := 0
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		tokens := strings.SplitN(part, ":", 2)
		if len(tokens) != 2 {
			continue
		}

		valueStr := strings.TrimSpace(tokens[0])
		countStr := strings.TrimSpace(tokens[1])

		value, errVal := strconv.ParseInt(valueStr, 10, 64)
		countNum, errCount := strconv.Atoi(countStr)

		if errVal != nil || errCount != nil {
			continue
		}

		sum += value * int64(countNum)
		count += countNum
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
