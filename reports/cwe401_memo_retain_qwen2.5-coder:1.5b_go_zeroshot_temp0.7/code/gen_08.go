package main

import (
	"fmt"
	"sort"
)

func main() {
	var queries []int
	for {
		var query int
		fmt.Scan(&query)
		if query == 0 {
			break
		}
		queries = append(queries, query)
	}

	sort.Ints(queries)

	total := 0
	memo := make(map[int]int)
	for _, query := range queries {
		if memo[query] == 0 {
			memo[query] = findSteps(query, memo)
		}
		total += memo[query]
	}

	fmt.Printf("total=%d\n", total)
}

func findSteps(query int, memo map[int]int) int {
	if query == 1 {
		return 0
	}

	if query%2 == 0 {
		return memo[query/2] + 1
	}

	return memo[3*query+1] + 1
}
