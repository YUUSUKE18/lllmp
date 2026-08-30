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
	if sc.Scan() {
		line := sc.Text()
		parts := strings.Split(line, ",")
		uniqueNumbers := make(map[int64]bool)
		var sum int64 = 0

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			num, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				continue // 無効な整数は無視
			}

			if !uniqueNumbers[num] {
				uniqueNumbers[num] = true
				sum += num
			}
		}

		count := len(uniqueNumbers)
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
