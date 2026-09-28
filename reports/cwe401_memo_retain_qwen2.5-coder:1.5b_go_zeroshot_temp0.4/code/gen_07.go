package main

import (
	"fmt"
	"math"
)

func main() {
	var total int
	var memo map[int]int

	for {
		line := fmt.Scanln()
		if len(line) == 0 {
			break
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
			continue
		}
		if _, ok := memo[n]; !ok {
			memo[n] = findSteps(n)
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}

func findSteps(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + findSteps(n/2)
	}
	return 1 + findSteps(3*n + 1)
}
