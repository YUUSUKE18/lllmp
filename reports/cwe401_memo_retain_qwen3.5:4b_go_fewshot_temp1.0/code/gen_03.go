package main

import (
	"bufio"
	"fmt"
	"os"
)

func collatzStep(n int64) int64 {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + collatzStep(n/2)
	}
	return 1 + collatzStep(3*n+1)
}

func memoizedCollatzStep(n int64, memo map[int64]int64) int64 {
	if val, ok := memo[n]; ok {
		return val
	}
	step := collatzStep(n)
	memo[n] = step
	return step
}

func main() {
	r := bufio.NewScanner(os.Stdin)
	var total int64
	memo := make(map[int64]int64)
	currentN := int64(0)

	for r.Scan() {
		line := r.Text()
		if line == "" {
			continue
		}

		var val int64
		if n, err := fmt.Sscanf(line, "%d", &val); n == 1 {
			currentN = val
			total += memoizedCollatzStep(currentN, memo)
		}
	}

	fmt.Printf("total=%d\n", total)
}
