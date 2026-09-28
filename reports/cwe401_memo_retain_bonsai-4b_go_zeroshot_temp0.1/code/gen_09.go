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

	if n%2 == 0 {
		next := n / 2
		return 1 + computeSteps(next)
	} else {
		next := 3 * n + 1
		if next > 2**63 {
			memo[n] = 0
			return 0
		}
		return 1 + computeSteps(next)
	}
}

func main() {
	var input []int
	for {
		line := fmt.Scan()
		if line == "" {
			break
		}
		if _, err := fmt.Atoi(line); err == nil {
			input = append(input, n)
		}
	}

	// Compute steps for each input
	var steps []int
	for _, n := range input {
		if n == 1 {
			steps = append(steps, 0)
		} else {
			steps = append(steps, computeSteps(n))
		}
	}

	// Sum all steps
	total := 0
	for _, s := range steps {
		total += s
	}

	fmt.Printf("%d\n", total)
}
