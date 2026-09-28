package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memo stores the calculated steps to reach 1 for previously encountered numbers.
var memo map[int64]int64

// calculateSteps recursively finds the number of steps required to reach 1 from n, using memoization.
func calculateSteps(n int64) int64 {
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

	// Recursive call and memoization
	steps := 1 + calculateSteps(nextN)
	memo[n] = steps
	return steps
}

func main() {
	// Initialize memoization map
	memo = make(map[int64]int64)

	// Read input from standard input
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

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

		// Process the query
		if n >= 1 {
			// Calculate steps for n
			steps := calculateSteps(n)
			totalSteps += steps
		}
	}

	// Output the result in the required format
	fmt.Printf("total=%d\n", totalSteps)
}
