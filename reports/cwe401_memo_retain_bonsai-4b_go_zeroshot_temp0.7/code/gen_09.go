package main

import (
	"fmt"
	"sort"
)

// Memoization for the Collatz sequence function
var memo = make(map[int]int)

func collatzStep(n int) int {
	if n == 1 {
		return 1
	}

	if memo[n] != 0 {
		return memo[n]
	}

	if n%2 == 0 {
		result := collatzStep(n / 2)
	} else {
		result := 3*n + 1
	}

	// Store result in memo
	memo[n] = result

	return result
}

func solve() {
	var total int
	for line := range os.Read() {
		line = string(line)
		if line == "" {
			continue
		}

		// Parse the input line: split by spaces, convert to int
		parts := strings.Fields(line)
		if len(parts) == 0 {
			continue
		}
		for _, part := range parts {
			if !part.isdigit() {
				continue
			}
			n := int(part)
			if n <= 0 {
				continue
			}
			// Compute steps to reach 1
			steps := 0
			curr := n
			for curr != 1 {
				curr = collatzStep(curr)
				steps++
			}
			total += steps
		}
	}

	fmt.Printf("%d\n", total)
}
