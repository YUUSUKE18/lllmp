package main

import (
	"fmt"
	"sort"
)

// memoizes the results of the 3n+1 sequence to avoid redundant computation
var memo = make(map[int]int)

func computeSteps(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}

	if n == 1 {
		return 0
	}

	// Apply the rule: if even, n/2, if odd, 3n+1
	next := 0
	if n%2 == 0 {
		next = n / 2
	} else {
		next = 3 * n + 1
	}

	// Recursive step with memoization
	steps := 1 + computeSteps(next)

	// Update memo
	memo[n] = steps

	return steps
}

func main() {
	var input []int
	// Read input line by line until EOF
	for {
		line := fmt.Scan()
		if line == "" {
			break
		}
		// Parse the integer
		if _, err := strconv.Atoi(line); err == nil {
			input = append(input, n)
		}
	}

	// Sum up the steps for all inputs
	total := 0
	for _, n := range input {
		total += computeSteps(n)
	}

	fmt.Println(total)
}
