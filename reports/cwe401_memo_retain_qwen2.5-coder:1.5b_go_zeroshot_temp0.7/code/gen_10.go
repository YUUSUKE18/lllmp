package main

import (
	"fmt"
)

var memo map[int]int

func main() {
	memo = make(map[int]int)
	var total int

	for {
		var input int
		fmt.Scan(&input)

		if input == 0 {
			break
		}

		if _, ok := memo[input]; !ok {
			memo[input] = computeSteps(input)
		}

		total += memo[input]
	}

	fmt.Println("total=", total)
}

func computeSteps(n int) int {
	if n == 1 {
		return 0
	}

	if n%2 == 0 {
		return computeSteps(n / 2) + 1
	}

	return computeSteps(3*n + 1) + 1
}
