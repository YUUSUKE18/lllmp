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

		step := calculateSteps(n, memo)
		total += step
	}

	fmt.Printf("total=%d\n", total)
}

func calculateSteps(n int64, memo map[int64]int) int {
	if n == 1 {
		return 0
	}

	if val, ok := memo[n]; ok {
		return val
	}

	var step int
	if n%2 == 0 {
		step = calculateSteps(n/2, memo) + 1
	} else {
		step = calculateSteps(3*n+1, memo) + 1
	}

	memo[n] = step
	return step
}
