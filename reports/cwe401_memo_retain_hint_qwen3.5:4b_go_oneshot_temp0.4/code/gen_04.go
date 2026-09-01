package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	memo := make(map[int64]int64)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		step := getStep(n, memo)
		total += step
	}

	fmt.Printf("total=%d\n", total)
}

func getStep(n int64, memo map[int64]int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	step := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	step += getStep(n, memo)
	memo[n] = step
	return step
}
