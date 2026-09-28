package main

import (
	"fmt"
	"sort"
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
			total += memo[n] = memo[n] + memo(n)
		}
	}

	fmt.Println("total=", total)
}

func memo(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + memo(n/2)
	}
	return 1 + memo(3*n + 1)
}
