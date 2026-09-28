package main

import (
	"fmt"
	"sort"
)

// memoizes the results of the 3n+1 sequence to avoid redundant computation
var memo = make(map[int]int)

func handCount(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}

	if n == 1 {
		result := 0
	} else if n%2 == 0 {
		result := handCount(n / 2)
	} else {
		result := 1 + handCount(3*n + 1)
	}

	memo[n] = result
	return result
}

func main() {
	var input []int
	for {
		line := fmt.Scan()
		if line == "" {
			break
		}
		// Parse the line into integers
		// Skip empty lines and non-integer lines
		var nums []int
		if _, err := fmt.Atoi(line); err != nil {
			continue
		}
		for _, num := range nums {
			if num < 0 {
				continue
			}
			if num == 0 {
				continue
			}
			// Compute handCount for each valid n
			result := handCount(num)
			// Accumulate the result
			total := total + result
		}
		// If input is empty, exit
		if len(nums) == 0 {
			break
		}
	}

	fmt.Printf("%d\n", total)
}
