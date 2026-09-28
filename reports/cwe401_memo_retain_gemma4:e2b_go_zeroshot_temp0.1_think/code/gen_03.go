package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memo stores the results of the Collatz sequence calculation: number -> steps to reach 1.
var memo map[int64]int64

// countSteps recursively calculates the number of steps required to reach 1 from n, using memoization.
func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}

	// Check memoization table
	if result, ok := memo[n]; ok {
		return result
	}

	var nextN int64
	if n%2 == 0 {
		// n is even: n/2
		nextN = n / 2
	} else {
		// n is odd: 3n + 1
		nextN = 3*n + 1
	}

	// Recursive call: steps = 1 + steps(nextN)
	steps := 1 + countSteps(nextN)

	// Store result in memoization table
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
		line := scanner.Text()
		// Ignore empty lines
		if line == "" {
			continue
		}

		// Parse the integer
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// Calculate steps for the current query n
		// Note: Since the input stream provides queries one by one, we calculate the steps for n.
		// The memoization ensures that if we encounter the same number again (which is possible if the input stream repeats numbers),
		// we reuse the calculation.
		steps := countSteps(n)
		totalSteps += steps
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSteps)

	if err := scanner.Err(); err != nil {
		// Handle potential errors during scanning
		// In competitive programming context, this is usually ignored unless specified.
	}
}
