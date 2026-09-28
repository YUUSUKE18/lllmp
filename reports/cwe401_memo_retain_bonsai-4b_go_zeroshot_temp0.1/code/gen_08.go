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
		values := make([]int, 0)
		for _, s := range line {
			if s == ' ' {
				continue
			}
			if s >= '0' && s <= '9' {
				values = append(values, int(s))
			}
		}
		if len(values) == 0 {
			break
		}
		// Sum the hand counts for all values
		total := 0
		for _, v := range values {
			total += handCount(v)
		}
		fmt.Printf("%d\n", total)
	}
}
