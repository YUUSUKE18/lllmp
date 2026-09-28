package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// memo stores the calculated steps for numbers already processed.
var memo map[int64]int64

// calculateSteps recursively finds the number of steps required to reach 1 from n.
// It uses memoization to store results.
func calculateSteps(n int64) int64 {
	if n == 1 {
		return 0
	}

	// Check memoization table
	if result, ok := memo[n]; ok {
		return result
	}

	var steps int64

	if n%2 == 0 {
		// n is even: n -> n/2
		steps = 1 + calculateSteps(n / 2)
	} else {
		// n is odd: n -> 3n + 1
		steps = 1 + calculateSteps(3*n + 1)
	}

	// Store result before returning
	memo[n] = steps
	return steps
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
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// Calculate steps for the current query n
		// Note: Since calculateSteps uses recursion and memoization,
		// it handles the entire path efficiently.
		steps := calculateSteps(n)
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// Handle potential reading errors
		// In competitive programming context, this is often ignored unless critical.
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSteps)
}
