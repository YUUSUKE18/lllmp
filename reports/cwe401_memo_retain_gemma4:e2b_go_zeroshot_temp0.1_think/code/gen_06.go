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

	var nextN int64
	if n%2 == 0 {
		// n is even: n/2
		nextN = n / 2
	} else {
		// n is odd: 3n+1
		nextN = 3*n + 1
	}

	// Recursively calculate steps and add 1 for the current step
	result := 1 + solve(nextN)
	memo[n] = result
	return result
}

func main() {
	// Initialize memoization map
	memo = make(map[int64]int64)

	// Use buffered reading for efficient input handling
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// Read input line by line
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

		// Calculate the steps for the current query n
		// Note: The problem asks for the steps from n to 1.
		steps := solve(n)
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// Handle potential errors during scanning
		// In competitive programming context, this is often ignored unless critical.
	}

	// Output the final result in the required format
	fmt.Printf("total=%d\n", totalSteps)
}
