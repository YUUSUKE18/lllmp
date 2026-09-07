package main

import (
	"fmt"
	"strconv"
)

func main() {
	var total int
	var memo map[int]int

	for {
		var query int
		_, err := fmt.Scan(&query)
		if err != nil {
			break
		}

		if query == 1 {
			fmt.Println("total=0")
			continue
		}

		if memo == nil {
			memo = make(map[int]int)
		}

		if result, exists := memo[query]; exists {
			fmt.Printf("total=%d\n", result)
			continue
		}

		var steps int
		for query != 1 {
			if query%2 == 0 {
				query /= 2
			} else {
				query = 3*query + 1
			}
			steps++
		}

		total += steps
		memo[query] = total
	}
}
