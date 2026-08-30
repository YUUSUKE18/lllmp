package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo map[int64]int64

func collatzStep(n int64) int64 {
	if _, ok := memo[n]; ok {
		return memo[n]
	}

	steps := 0
	if n == 1 {
		memo[n] = 0
		return 0
	}
	if n%2 == 0 {
		steps += collatzStep(n / 2)
	} else {
		steps += collatzStep(3*n + 1)
	}

	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	mem = make(map[int64]int64)
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		total += collatzStep(n)
	}

	fmt.Printf("total=%d\n", total)
}
