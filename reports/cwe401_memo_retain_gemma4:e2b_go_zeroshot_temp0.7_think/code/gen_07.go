package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// memo stores the calculated number of steps from n to 1.
var memo map[int64]int64

// countSteps recursively calculates the number of steps required to reach 1 from n,
// utilizing memoization.
func countSteps(n int64) int64 {
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
		steps = 1 + countSteps(n / 2)
	} else {
		// n is odd: n -> 3n + 1
		// We must ensure 3n+1 does not overflow int64, though for typical competitive programming constraints,
		// this is usually handled by the problem setter ensuring the necessary range.
		// Since the prompt mentions values fit in 64bit, we proceed with standard multiplication.
		steps = 1 + countSteps(3*n + 1)
	}

	// Store result before returning
	memo[n] = steps
	return steps
}

func main() {
	// Initialize memoization table
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
		// Note: Since the input provides queries sequentially, we calculate the steps for n and add them to the total.
		steps := countSteps(n)
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// Handle potential read errors
		// We continue processing even if an error occurs during scanning, 
		// but typically this is fine if input is well-formed.
	}

	// Output the final total
	fmt.Printf("total=%d\n", totalSteps)
}
