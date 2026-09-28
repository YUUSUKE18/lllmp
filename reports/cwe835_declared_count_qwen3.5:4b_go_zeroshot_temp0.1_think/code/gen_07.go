package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int64 = 0
	var sum int64 = 0
	lineNum := 0

	for scanner.Scan() {
		lineNum++
		if lineNum == 1 {
			continue
		}

		text := scanner.Text()
		trimmed := strings.TrimSpace(text)
		if trimmed == "" {
			continue
		}

		val, err := strconv.ParseInt(trimmed, 10, 64)
		if err != nil {
			continue
		}

		count++
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
