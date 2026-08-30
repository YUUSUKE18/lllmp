package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}

	line := scanner.Text()
	parts := strings.Split(line, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		if part == "" {
			continue
		}
		pair := strings.Split(part, ":")
		if len(pair) != 2 {
			continue
		}

		var valueStr, countStr string
		_, err1 := fmt.Sscanf(pair[0], "%s", &valueStr)
		_, err2 := fmt.Sscanf(pair[1], "%s", &countStr)

		if err1 != nil || err2 != nil {
			continue
		}

		var value int64
		var count int64
		_, err := fmt.Sscanf(valueStr, "%d", &value)
		_, err = fmt.Sscanf(countStr, "%d", &count)

		if err != nil {
			continue
		}

		// 回数が0以上のもののみを考慮（仕様上回数は0以上）
		if count >= 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
