package main

import (
	"bufio"
	"fmt"
	"os"
)

func solve(n int64, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	key := int(n)
	if val, ok := memo[key]; ok {
		return val
	}
	steps := 0
	if n%2 == 0 {
		steps = solve(n/2, memo)
	} else {
		steps = solve(3*n+1, memo)
	}
	memo[key] = steps + 1
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int]int)
	totalSteps := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		f, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || f != 1 {
			continue
		}
		steps := solve(n, memo)
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}
