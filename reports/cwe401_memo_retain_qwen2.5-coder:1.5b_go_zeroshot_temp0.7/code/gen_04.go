package main

import (
	"fmt"
	"math/big"
)

func main() {
	var total int64
	memo := make(map[int64]int64)

	for {
		input, err := fmt.Scanln(&n)
		if err != nil {
			break
		}
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
				total += memo[n]
				break
			}
			memo[n] = count
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
