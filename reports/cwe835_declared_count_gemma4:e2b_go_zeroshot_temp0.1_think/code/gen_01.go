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

	// 1. Read the first line (N, the expected count)
	if !scanner.Scan() {
		// Handle empty input
		fmt.Println("count=0 sum=0")
		return
	}

	// We ignore the value of N itself, as we only care about the actual numbers read later.
	// We still consume the line to proceed.
	// N, err := strconv.Atoi(scanner.Text())
	// if err != nil {
	// 	// If the first line is invalid, we stop.
	// 	fmt.Println("count=0 sum=0")
	// 	return
	// }
	
	// 2. Process subsequent lines for integers
	var count int64 = 0
	var sum int64 = 0

	// Start reading from the second line
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// Ignore empty lines
			continue
		}

		// Attempt to parse the line as an integer
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// Update count and sum
		count++
		sum += num
	}

	// 3. Output the result
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
