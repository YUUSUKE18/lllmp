package main

import (
	"fmt"
	"math"
)

func main() {
	var total int
	memo := make(map[int]int)
	for {
		var n int
		fmt.Scan(&n)
		if n == 0 {
			break
		}
		if _, ok := memo[n]; !ok {
			memo[n] = calculateSteps(n)
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}

func calculateSteps(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + calculateSteps(n / 2)
	}
	return 1 + calculateSteps(3*n + 1)
}
