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

	// 1. Read the first line (N, the claimed count)
	if !scanner.Scan() {
		// No input provided
		fmt.Println("count=0 sum=0")
		return
	}

	// We read N, but we don't strictly need to use it for filtering, 
	// as we must process all successfully read integers.
	// We discard the value of N for simplicity, focusing only on the subsequent numbers.
	// NStr := scanner.Text() 

	var count int64 = 0
	var sum int64 = 0

	// 2. Read the remaining lines and process integers
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

		// Successfully parsed integer found
		sum += num
		count++
	}

	// 3. Output the result
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
