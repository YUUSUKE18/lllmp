package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// memo stores the calculated steps for previously encountered numbers.
var memo map[int64]int64

// solve calculates the number of steps required to reach 1 from n, using memoization.
func solve(n int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var steps int64
	if n%2 == 0 {
		// n is even: n/2
		steps = 1 + solve(n/2)
	} else {
		// n is odd: 3n+1
		steps = 1 + solve(3*n+1)
	}

	// Store the result before returning
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

		// Attempt to parse the line as an integer
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// Calculate the steps for this query
		steps := solve(n)
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// Handle potential reading errors
		// In competitive programming context, this is often ignored unless critical.
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSteps)
}
