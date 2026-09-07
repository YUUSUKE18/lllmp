package main

import (
	"fmt"
	"strconv"
)

var memo map[int]int

func main() {
	memo = make(map[int]int)
	total := 0

	for {
		var input string
		fmt.Scanln(&input)

		if len(input) == 0 {
			break
		}

		n, err := strconv.Atoi(input)
		if err != nil {
			continue
		}

		if n == 1 {
			total += 0
			continue
		}

		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		memo[n] = calculateSteps(n)
		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}

func calculateSteps(n int) int {
	if n == 1 {
		return 0
	}

	if n%2 == 0 {
		return 1 + calculateSteps(n/2)
	}

	return 1 + calculateSteps(3*n + 1)
}
