package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(nil)
	input := reader.ReadString('\n')
	if input == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	input = strings.TrimSpace(input)
	parts := strings.Split(input, ",")

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
		repeatCountStr := strings.TrimSpace(tokens[1])

		if valueStr == "" || repeatCountStr == "" {
			continue
		}

		value, err := strconv.ParseInt(valueStr, 10, 64)
		if err != nil {
			continue
		}

		repeatCount, err := strconv.ParseInt(repeatCountStr, 10, 64)
		if err != nil || repeatCount < 0 {
			continue
		}

		count += int(repeatCount)
		sum += value * repeatCount
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
