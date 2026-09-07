package main

import (
	"fmt"
	"math"
)

var memo [1000001]int

func main() {
	var n int
	for {
		fmt.Scan(&n)
		if n <= 0 {
			break
		}
		memo[n] = climb(n)
	}
	fmt.Printf("total=%d\n", sum(memo))
}

func climb(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		memo[n] = 1 + climb(n/2)
	} else {
		memo[n] = 1 + climb(3*n + 1)
	}
	return memo[n]
}

func sum(arr []int) int {
	sum := 0
	for _, v := range arr {
		sum += v
	}
	return sum
}
