package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// memoization map to store the results of previously calculated steps
var memo map[int64]int64

// countSteps calculates the number of steps required to reach 1 from n, using memoization.
func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}

	// Check memoization table
	if val, ok := memo[n]; ok {
		return val
	}

	var steps int64

	// Standard Collatz sequence calculation
	current := n
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

	// Store result in memoization table before returning
	memo[n] = steps
	return steps
}

func main() {
	// Initialize memoization map
	memo = make(map[int64]int64)

	// Set up input reading
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// Process queries line by line
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		// Attempt to parse the line as an integer
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not valid integers
		}

		// Calculate steps for the current query n
		steps := countSteps(n)
		totalSteps += steps
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSteps)
}
