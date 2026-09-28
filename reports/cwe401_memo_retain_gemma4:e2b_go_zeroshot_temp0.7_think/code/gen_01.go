package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// memoization map to store the results of calculated steps
var memo map[int64]int64

// calculateSteps recursively finds the number of steps to reach 1 from n, using memoization.
func calculateSteps(n int64) int64 {
	if n == 1 {
		return 0
	}

	// Check memoization table
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64
	if n%2 == 0 {
		// Even: n/2
		result = 1 + calculateSteps(n/2)
	} else {
		// Odd: 3n + 1
		result = 1 + calculateSteps(3*n+1)
	}

	// Store result before returning
	memo[n] = result
	return result
}

func main() {
	// Initialize memoization map
	memo = make(map[int64]int64)

	// Read input from standard input
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// Process queries line by line
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not valid integers
		}

		// Calculate steps for the current query n
		// Note: Since the calculation function relies on the global memo map,
		// it automatically handles memoization across all queries.
		steps := calculateSteps(n)
		totalSteps += steps
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSteps)

	if err := scanner.Err(); err != nil {
		// Handle potential reading errors
		// In competitive programming contexts, this is often ignored unless strict error handling is required.
	}
}
