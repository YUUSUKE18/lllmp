package main

import (
	"fmt"
	"math"
	"sort"
)

func main() {
	var total int64
	memo := make(map[int]int)

	for {
		var query int
		fmt.Scan(&query)
		if query == 0 {
			break
		}

		total += memo[query]
		memo[query] = dfs(query, memo)
	}

	fmt.Printf("total=%d\n", total)
}

func dfs(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}

	if _, ok := memo[n]; ok {
		return memo[n]
	}

	if n%2 == 0 {
		memo[n] = 1 + dfs(n/2, memo)
	} else {
		memo[n] = 1 + dfs(3*n+1, memo)
	}

	return memo[n]
}
