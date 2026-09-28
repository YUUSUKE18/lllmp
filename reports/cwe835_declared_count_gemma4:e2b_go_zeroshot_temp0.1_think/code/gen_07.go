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

	// 1. Read the expected count (N) from the first line.
	if !scanner.Scan() {
		// No input provided
		fmt.Println("count=0 sum=0")
		return
	}

	// Parse N. We ignore the error handling for N itself, assuming it's a valid integer based on the prompt structure.
	nStr := strings.TrimSpace(scanner.Text())
	n, err := strconv.Atoi(nStr)
	if err != nil {
		// If the first line is invalid, we treat the actual count as 0.
		fmt.Println("count=0 sum=0")
		return
	}

	var sum int64 = 0
	var count int = 0

	// 2. Read the remaining integers.
	// We read up to N lines, or until EOF, handling potential noise.
	for i := 0; i < n && scanner.Scan(); i++ {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// Ignore empty lines
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// 3. Process the valid integer.
		sum += num
		count++
	}

	// 4. Output the result.
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
