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

	line := sc.Text()
	parts := strings.Split(line, ",")

	count := 0
	sum := int64(0)

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
		countNum, errCount := strconv.Atoi(countStr)

		if errVal != nil || errCount != nil {
			continue
		}

		count += int64(countNum)
		sum += val * int64(countNum)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
