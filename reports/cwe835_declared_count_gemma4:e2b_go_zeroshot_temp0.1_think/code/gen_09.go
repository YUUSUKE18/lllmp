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

	// We read N, but we don't strictly need to use it to limit the loop,
	// as we process all subsequent valid integers found.
	// We discard the value of N for simplicity, focusing only on reading the rest of the stream.
	// If we strictly adhere to reading N, we would parse it here, but since we ignore
	// the constraint mismatch, we just proceed to read the numbers.
	// NStr := scanner.Text() 

	var count int64 = 0
	var sum int64 = 0

	// 2. Read the remaining lines and parse integers
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

		// 3. Update count and sum
		count++
		sum += num
	}

	// 4. Output the result
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
