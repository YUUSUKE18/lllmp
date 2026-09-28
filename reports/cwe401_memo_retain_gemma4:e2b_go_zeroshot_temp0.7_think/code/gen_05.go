package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// countSteps calculates the number of steps required to reach 1 from n.
// It uses memoization (memo) to store previously calculated results.
func countSteps(n int64, memo map[int64]int64) int64 {
	if n == 1 {
		return 0
	}
	if result, ok := memo[n]; ok {
		return result
	}

	var steps int64 = 0
	current := n

	// Iteratively calculate the steps
	for current != 1 {
		if current%2 == 0 {
			current /= 2
		} else {
			// 3n + 1. Since intermediate values can be large, int64 is used.
			current = 3*current + 1
		}
		steps++
	}

	// Memoize the result for all numbers encountered in the path
	// Note: For the specific requirement of the problem (finding steps for a single N),
	// memoizing the final result N -> 1 is sufficient.
	memo[n] = steps
	return steps
}

func main() {
	// Use a map for memoization to store results: number -> steps
	memo := make(map[int64]int64)
	var totalSteps int64 = 0

	scanner := bufio.NewScanner(os.Stdin)

	// Process queries from standard input
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n < 1 {
			// Ignore lines that are not valid integers or are less than 1
			continue
		}

		// Calculate steps for the current query n
		// We call countSteps, which handles the iterative calculation and memoization.
		steps := countSteps(n, memo)
		totalSteps += steps
	}

	// Output the final result in the required format
	fmt.Printf("total=%d\n", totalSteps)

	if err := scanner.Err(); err != nil {
		// Handle potential input reading errors
		// (though typically ignored in competitive programming contexts unless specified)
	}
}
