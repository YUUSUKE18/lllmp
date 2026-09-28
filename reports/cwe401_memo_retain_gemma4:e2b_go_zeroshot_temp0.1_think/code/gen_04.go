package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// memo stores the calculated steps for numbers already processed.
var memo map[int]int

// calculateSteps recursively finds the number of steps from n to 1, using memoization.
func calculateSteps(n int) int {
	if n == 1 {
		return 0
	}
	if result, ok := memo[n]; ok {
		return result
	}

	var steps int
	if n%2 == 0 {
		// n is even: n -> n/2
		steps = 1 + calculateSteps(n/2)
	} else {
		// n is odd: n -> 3n + 1
		steps = 1 + calculateSteps(3*n+1)
	}

	// Memoize the result
	memo[n] = steps
	return steps
}

func main() {
	// Initialize memoization map
	memo = make(map[int]int)

	// Read input from standard input
	scanner := bufio.NewScanner(os.Stdin)
	var totalSum int64 = 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// Calculate the steps for the current query n
		// Note: Since the transformation path involves numbers potentially larger than the initial n,
		// we must ensure the recursive calls handle the memoization correctly.
		// The standard Collat sequence calculation is usually done iteratively or recursively.
		// Since we are calculating the path to 1, we use the recursive function.
		steps := calculateSteps(n)
		totalSum += int64(steps)
	}

	if err := scanner.Err(); err != nil {
		// Handle potential errors during scanning
	}

	// Output the final result
	fmt.Printf("total=%d\n", totalSum)
}
