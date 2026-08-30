package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// Memoization table to store results
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// Recursive function with memoization
		var calculateSteps func(n int) int64
		calculateSteps = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// n is even: n/2
				result = calculateSteps(n / 2)
			} else {
				// n is odd: 3n+1
				result = 3*int64(n) + 1 + calculateSteps(3*int(n)+1)
			}

			memo[n] = result
			return result
		}

		// Calculate the steps for the current n
		steps := calculateSteps(n)
		total += steps
	}

	if err := scanner.Err(); err != nil {
		// Handle potential reading errors if necessary, though for this problem structure it might be simpler to ignore.
	}

	// Output the final result
	fmt.Printf("total=%d\n", total)
}
