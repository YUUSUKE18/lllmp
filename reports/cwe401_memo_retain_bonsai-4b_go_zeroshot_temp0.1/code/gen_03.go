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
		// Parse the line as integers
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

		// Compute total hand count for all inputs
		total := 0
		for _, n := range nums {
			if n > 0 {
				total += handCount(n)
			}
		}

		fmt.Printf("%d\n", total)
	}
}
