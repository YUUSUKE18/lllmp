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

		count := getSteps(n, memo)
		total += count
	}

	fmt.Printf("total=%d\n", total)
}

func getSteps(n int64, memo map[int64]int) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	steps += getSteps(n, memo)
	memo[n] = steps + 1
	return steps + 1
}
