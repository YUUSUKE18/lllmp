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
		if memo[n] != 0 {
			total += memo[n]
			continue
		}
		count := 0
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
			if memo[n] != 0 {
				count += memo[n]
				break
			}
			memo[n] = count
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
