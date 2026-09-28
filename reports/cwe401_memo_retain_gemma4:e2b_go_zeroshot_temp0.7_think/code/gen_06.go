package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memo stores the calculated steps for numbers already processed.
var memo map[int64]int64

// countSteps calculates the number of steps required to reach 1 from n, using memoization.
func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}

	// Check memoization table
	if result, ok := memo[n]; ok {
		return result
	}

	var steps int64 = 0
	current := n

	// Calculate steps iteratively
	for current != 1 {
		if current%2 == 0 {
			// n is even: n/2
			current /= 2
		} else {
			// n is odd: 3n+1
			current = 3*current + 1
		}
		steps++
	}

	// Store the result before returning
	memo[n] = steps
	return steps
}

func main() {
	// Initialize memoization map
	memo = make(map[int64]int64)

	// Use a scanner to read input line by line
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// Read queries
	for scanner.Scan() {
		line := scanner.Text()
		// Try to parse the line as an integer
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers (including empty lines)
			continue
		}

		// Calculate steps for the current query n
		steps := countSteps(n)
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// Handle potential errors during scanning (e.g., EOF)
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSteps)
}
