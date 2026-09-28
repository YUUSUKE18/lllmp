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
	firstLine := true

	for scanner.Scan() {
		line := scanner.Text()
		if firstLine {
			firstLine = false
			continue
		}

		trimmed := strings.TrimSpace(line)
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
