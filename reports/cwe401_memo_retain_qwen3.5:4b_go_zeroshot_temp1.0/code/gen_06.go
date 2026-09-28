package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	total := 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		total += collatzStep(n, memo)
	}

	fmt.Printf("total=%d\n", total)
}

func collatzStep(n int64, memo map[int64]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var nextN int64
	var step int

	if n%2 == 0 {
		nextN = n / 2
	} else {
		nextN = 3*n + 1
	}

	step = 1 + collatzStep(nextN, memo)
	memo[n] = step
	return step
}
