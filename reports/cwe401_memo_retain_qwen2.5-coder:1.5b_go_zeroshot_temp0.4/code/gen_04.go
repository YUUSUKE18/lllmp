package main

import (
	"fmt"
	"strconv"
)

func main() {
	var total int
	queryMap := make(map[int]int)

	for {
		query, err := fmt.Scanln()
		if err == io.EOF {
			break
		}
		query, _ = strconv.Atoi(query)
		if query == 1 {
			fmt.Println("total=", total)
			return
		}
		if queryMap[query] > 0 {
			fmt.Println("total=", total + queryMap[query])
			return
		}
		queryMap[query] = solve(query, queryMap)
		total += queryMap[query]
	}
}

func solve(query int, queryMap map[int]int) int {
	if query == 1 {
		return 0
	}
	if query%2 == 0 {
		return 1 + solve(query/2, queryMap)
	}
	return 1 + solve(3*query+1, queryMap)
}
