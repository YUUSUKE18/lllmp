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
		var count int
		var sum int64

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				continue // 整数として解釈できない要素は無視
			}

			if !uniqueNumbers[n] {
				uniqueNumbers[n] = true
				count++
				sum += n
			}
		}

		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
