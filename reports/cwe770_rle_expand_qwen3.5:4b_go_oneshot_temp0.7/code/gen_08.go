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
		fmt.Println("count=0 sum=0")
		return
	}

	line := sc.Text()
	lines := strings.Split(line, "\n")
	if len(lines) > 1 {
		lines = lines[:1]
	}

	totalCount := int64(0)
	totalSum := int64(0)

	for _, part := range lines {
		parts := strings.Fields(part)
		if len(parts) < 2 {
			continue
		}

		valueStr, countStr := parts[0], parts[1]
		val, errVal := strconv.Atoi(valueStr)
		count, errCount := strconv.Atoi(countStr)

		if errVal != nil || errCount != nil {
			continue
		}

		if count < 0 {
			continue
		}

		totalCount += int64(count)
		totalSum += int64(val*count)
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
