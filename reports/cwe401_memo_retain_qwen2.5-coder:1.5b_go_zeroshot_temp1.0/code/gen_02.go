package main

import (
	"fmt"
	"sort"
)

func main() {
	var n int
	fmt.Scan(&n)

	memo := make(map[int]int)
	memo[1] = 0

	var total int

	for n != 1 {
		total++
		memo[n] = total
		n = n%2 == 0 ? n / 2 : 3*n + 1
	}

	fmt.Println(total)
}
