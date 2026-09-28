package main

import (
	"fmt"
	"hash/fnv"
)

func main() {
	var total int64
	var memo map[int]int64

	for {
		var input int
		fmt.Scan(&input)

		if input == 0 {
			break
		}

		if _, ok := memo[input]; !ok {
			memo[input] = calculateSteps(input)
		}

		total += memo[input]
	}

	fmt.Printf("total=%d\n", total)
}

func calculateSteps(n int) int64 {
	var steps int64

	for n != 1 {
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		steps++
	}

	return steps
}
