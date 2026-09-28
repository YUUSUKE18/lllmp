package main

import (
	"fmt"
	"sort"
)

// memoizes the results of the 3n+1 sequence to avoid redundant computation
var memo = make(map[int]int)

func handCount(n int) int {
	if n == 1 {
		return 0
	}

	if memo[n] != 0 {
		return memo[n]
	}

	// Apply the rule: if even, divide by 2; if odd, apply 3n+1
	result := 0
	current := n
	for current != 1 {
		if current%2 == 0 {
			current = current / 2
		} else {
			current = 3 * current + 1
		}
		result++
	}

	// Store in memo
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
		for _, s := range line {
			if s == ' ' {
				continue
			}
			if s >= '0' && s <= '9' {
				nums = append(nums, int(s))
			}
		}
		if len(nums) == 0 {
			break
		}
		// Sum the hand counts for all numbers in the input
		total := 0
		for _, n := range nums {
			total += handCount(n)
		}
		fmt.Printf("%d\n", total)
	}
}
