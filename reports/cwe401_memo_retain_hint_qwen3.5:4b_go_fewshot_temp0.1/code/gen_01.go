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

		step := solve(n, memo)
		total += step
	}

	fmt.Printf("total=%d\n", total)
}

func solve(n int64, memo map[int64]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	step := 1
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}

	subStep := solve(n, memo)
	memo[n] = step + subStep
	return memo[n]
}
