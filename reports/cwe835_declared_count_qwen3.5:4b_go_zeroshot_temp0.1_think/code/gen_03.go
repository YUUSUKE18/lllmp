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

	// Read and discard the first line (metadata count)
	if !scanner.Scan() {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	var count int64 = 0
	var sum int64 = 0

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
