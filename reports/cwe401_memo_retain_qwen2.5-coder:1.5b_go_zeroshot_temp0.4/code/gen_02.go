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

		if n == 1 {
			fmt.Println(total)
			return
		}

		if _, ok := memo[n]; ok {
			fmt.Println(total + memo[n])
			return
		}

		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}

		total++
		memo[n] = total
	}
}
