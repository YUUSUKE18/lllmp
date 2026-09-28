package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memo stores the calculated steps for numbers already processed.
var memo = make(map[int64]int64)

// countSteps calculates the number of steps required for n to reach 1,
// using memoization.
func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}
	if result, ok := memo[n]; ok {
		return result
	}

	var steps int64 = 0
	current := n
	
	// Iterative calculation is often safer and avoids deep recursion limits,
	// although the problem description implies a recursive structure.
	// We will use an iterative approach here for robustness.
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
	// Use bufio.Scanner to read input efficiently
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// Process queries line by line
	for scanner.Scan() {
		line := scanner.Text()
		
		// Ignore empty lines
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
		totalSteps += steps
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSteps)
}
