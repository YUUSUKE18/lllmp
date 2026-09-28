package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memoization stores the calculated steps for numbers already processed.
var memo map[int64]int64

// countSteps recursively calculates the number of steps required to reach 1 from n,
// utilizing memoization.
func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}
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

	// Recursively calculate steps for the next number and add 1 (for the current step)
	result := 1 + countSteps(nextN)

	// Memoize the result before returning
	memo[n] = result
	return result
}

func main() {
	// Initialize memoization map
	memo = make(map[int64]int64)

	// Read input from standard input
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// Process queries one by one
	for scanner.Scan() {
		line := scanner.Text()
		// Attempt to parse the line as an integer
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers (including empty lines)
			continue
		}

		// Calculate the steps for the current query n
		// Note: Since the calculation involves recursion and memoization,
		// we calculate the steps for n and store them in the memo map.
		steps := countSteps(n)
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// Handle potential errors during scanning
		// In a competitive programming context, this might be ignored unless critical.
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSteps)
}
