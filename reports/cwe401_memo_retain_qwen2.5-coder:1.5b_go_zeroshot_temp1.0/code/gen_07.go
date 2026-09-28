package main

import (
	"fmt"
	"math"
)

func main() {
	var total int
	memo := make(map[int]int)

	for {
		var query int
		fmt.Scan(&query)

		if query == 0 {
			break
		}

		total += computeSteps(query, memo)
	}

	fmt.Printf("total=%d\n", total)
}

func computeSteps(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}

	if steps, exists := memo[n]; exists {
		return steps
	}

	steps := 1 + computeSteps(n%2 == 0 && n != 2? n/2 : 3*n+1, memo)
	memo[n] = steps
	return steps
}
