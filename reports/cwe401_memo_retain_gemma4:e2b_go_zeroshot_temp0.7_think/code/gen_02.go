package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// solveN calculates the number of steps required to reach 1 from n.
// It uses memoization to store results for previously calculated numbers.
func solveN(n int64, memo map[int64]int64) int64 {
	if n == 1 {
		return 0
	}
	if result, ok := memo[n]; ok {
		return result
	}

	current := n
	steps := int64(0)

	// Iteratively apply the Collatz steps
	for current != 1 {
		if current%2 == 0 {
			// n is even: n/2
			current /= 2
		} else {
			// n is odd: 3n + 1
			// Note: Since current can be large, 3*current + 1 must fit in int64.
			// The problem statement allows intermediate values to exceed 32bit but fit in 64bit.
			current = 3*current + 1
		}
		steps++
	}

	// Memoize the result before returning
	memo[n] = steps
	return steps
}

func main() {
	// Use a map for memoization: key is the starting number, value is the steps to reach 1.
	memo := make(map[int64]int64)
	var totalSteps int64 = 0

	scanner := bufio.NewScanner(os.Stdin)

	// Read input line by line
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		// Attempt to parse the line as an integer
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// Calculate steps for the current query n
		steps := solveN(n, memo)
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// Handle potential reading errors
		// In a strict CP environment, this might be omitted, but good practice dictates handling it.
	}

	// Output the final result in the required format
	fmt.Printf("total=%d\n", totalSteps)
}
