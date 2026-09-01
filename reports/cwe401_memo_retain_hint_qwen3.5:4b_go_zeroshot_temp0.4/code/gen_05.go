package main

import (
	"bufio"
	"fmt"
	"os"
)

// memo stores the number of steps for each starting integer.
// Key: int64 (to handle values exceeding 32-bit range), Value: int64 (steps)
var memo = make(map[int64]int64)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue // Ignore empty lines
		}

		var n int64
		// Try to parse the integer. If it fails, ignore the line.
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue // Ignore lines that cannot be interpreted as integers
		}

		steps := calculateSteps(n)
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}

// calculateSteps computes the number of steps to reach 1 for a given n.
// It uses memoization to store results for previously computed values.
func calculateSteps(n int64) int64 {
	if n == 1 {
		return 0
	}

	// Check if we have already computed the result for this n
	if val, ok := memo[n]; ok {
		return val
	}

	steps := 0
	current := n

	for current != 1 {
		if current%2 == 0 {
			current = current / 2
		} else {
			current = 3*current + 1
		}
		steps++
	}

	memo[n] = steps
	return steps
}
