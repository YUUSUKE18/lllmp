package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// memo stores the results of the step count calculation for optimization.
var memo map[int64]int64

// countSteps recursively calculates the number of steps required to reach 1 from n,
// using memoization.
func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}
	if result, found := memo[n]; found {
		return result
	}

	var steps int64
	if n%2 == 0 {
		// n is even: n/2
		steps = 1 + countSteps(n / 2)
	} else {
		// n is odd: 3n + 1
		steps = 1 + countSteps(3*n+1)
	}

	// Memoize the result
	memo[n] = steps
	return steps
}

func main() {
	// Initialize memoization table
	memo = make(map[int64]int64)

	// Use a scanner to read input line by line
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// Process queries
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		// Attempt to parse the integer
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// Calculate steps for the current query
		// Since we are calculating the steps for n, we call countSteps(n)
		// The calculation implicitly handles memoization across all calls.
		steps := countSteps(n)
		totalSteps += steps
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSteps)

	if err := scanner.Err(); err != nil {
		// Handle potential errors during scanning, though unlikely for standard input
		// fmt.Fprintln(os.Stderr, "error reading input:", err)
	}
}
