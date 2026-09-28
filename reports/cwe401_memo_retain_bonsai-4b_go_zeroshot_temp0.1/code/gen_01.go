package main

import (
	"fmt"
	"sort"
)

// memoizes the results of the 3n+1 sequence to avoid redundant calculations
var memo = make(map[int]int)

func solve(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}

	if n == 1 {
		result := 0
	} else if n%2 == 0 {
		result := solve(n / 2)
	} else {
		result := 1 + solve(3*n + 1)
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
		if _, err := fmt.Atoi(line); err == nil {
			input = append(input, n)
		}
	}

	if len(input) == 0 {
		fmt.Println("0")
		return
	}

	// Compute the number of steps for each n
	var steps []int
	for _, n := range input {
		if n == 1 {
			steps = append(steps, 0)
		} else {
			steps = append(steps, solve(n))
		}
	}

	// Sum all steps
	total := 0
	for _, s := range steps {
		total += s
	}

	fmt.Println(total)
}
