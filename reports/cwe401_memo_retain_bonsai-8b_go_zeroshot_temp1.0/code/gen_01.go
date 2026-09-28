package main

import (
	"fmt"
	"math"
)

func main() {
	// Read input from stdin
	var lines []string
	for {
		if !readLine(&lines) {
			break
		}
	}

	// Process each line
	total := 0
	memo := make(map[int]int)

	for _, line := range lines {
		// Ignore empty lines
		if len(line) == 0 {
			continue
		}

		// Try to parse as integer
		n, err := parseInt(line)
		if err != nil {
			continue
		}

		// If n is already in memo, use it
		if m, ok := memo[n]; ok {
			total += m
			continue
		}

		// Compute steps for n
		steps := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3 * current + 1
			}
			steps++
			// Check for cycle to avoid infinite loops
			if current == current%2 && current == current%2 + 1 {
				break
			}
		}

		// Memoize result
		memo[n] = steps

		// Add to total
		total += steps
	}

	// Output result
	fmt.Printf("total=%d\n", total)
}

func parseInt(s string) (int, error) {
	n, err := parse(s)
	if err != nil {
		return 0, err
	}
	return n, nil
}

func parse(s string) (int, error) {
	var result int
	for _, c := range s {
		if c >= '0' && c <= '9' {
			result = result*10 + (c-'0')
		} else {
			return 0, fmt.Errorf("invalid integer")
		}
	}
	return result, nil
}
