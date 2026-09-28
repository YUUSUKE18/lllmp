package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int64)

	var total int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n < 0 || n > 18446744073709551615 {
			continue
		}

		if n == 1 {
			continue
		}

		steps := solve(n, memo)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

func solve(n int64, memo map[int64]int64) int64 {
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	steps++

	memo[n] = steps
	return solve(n, memo) + steps - 1
}
