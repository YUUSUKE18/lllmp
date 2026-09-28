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
		// Parse the line to integers
		// Skip empty lines and non-integer lines
		var nums []int
		if _, err := fmt.Atoi(line); err == nil {
			nums = append(nums, line)
		}
		if len(nums) == 0 {
			break
		}

		// Compute the hand count for each number
		var counts []int
		for _, num := range nums {
			if num > 0 {
				counts = append(counts, handCount(num))
			}
		}

		// Sum all counts
		total := 0
		for _, c := range counts {
			total += c
		}

		fmt.Println(total)
	}
}
