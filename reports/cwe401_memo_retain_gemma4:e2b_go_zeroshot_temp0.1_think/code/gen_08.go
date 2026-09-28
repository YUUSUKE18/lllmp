package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// memoization table to store the calculated steps for previously encountered numbers.
var memo map[int64]int64

// countSteps calculates the number of steps required to reach 1 from n, using memoization.
func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}
	if result, ok := memo[n]; ok {
		return result
	}

	var steps int64
	current := n

	// Iterative calculation for the sequence
	for current != 1 {
		if current%2 == 0 {
			current /= 2
		} else {
			// 3n + 1
			current = 3*current + 1
		}
		steps++
	}

	// Store result before returning
	memo[n] = steps
	return steps
}

func main() {
	// Initialize memoization table
	memo = make(map[int64]int64)

	// Use a scanner to read input line by line
	scanner := bufio.NewScanner(os.Stdin)
	var totalSum int64 = 0

	// Process input queries
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

		// Calculate steps for the current query n
		steps := countSteps(n)
		totalSum += steps
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSum)
}
