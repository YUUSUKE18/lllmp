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

	// 1. Read the first line (expected count N)
	if !scanner.Scan() {
		// No input provided
		fmt.Println("count=0 sum=0")
		return
	}

	// We read N, but we don't strictly need to use it for limiting the loop,
	// as we must process all valid integers found.
	// We parse it just to consume the line, although the actual count will be determined by reading subsequent lines.
	_, err := strconv.Atoi(scanner.Text())
	if err != nil {
		// If the first line is invalid, we stop.
		fmt.Println("count=0 sum=0")
		return
	}

	var count int64 = 0
	var sum int64 = 0

	// 2. Read the remaining lines (the numbers)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		// Attempt to parse the line as an integer
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// 3. Accumulate results
		sum += num
		count++
	}

	// 4. Output the result
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
