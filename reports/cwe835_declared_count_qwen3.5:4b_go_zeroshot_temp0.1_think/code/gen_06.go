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
	var count int64
	var sum int64

	// Read first line (count N), ignore it as per spec structure
	if scanner.Scan() {
		_ = scanner.Text() // Skip the expected count line
	}

	for scanner.Scan() {
		line := scanner.Text()
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
