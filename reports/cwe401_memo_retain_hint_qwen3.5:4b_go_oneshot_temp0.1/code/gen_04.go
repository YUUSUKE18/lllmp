package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		step := collatzStep(n, memo)
		total += step
	}

	fmt.Printf("total=%d\n", total)
}

func collatzStep(n int64, memo map[int64]int) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	step := 1
	next := n
	if next%2 == 0 {
		next = next / 2
	} else {
		next = 3*n + 1
	}

	subStep := collatzStep(next, memo)
	memo[n] = step + subStep
	return memo[n]
}
