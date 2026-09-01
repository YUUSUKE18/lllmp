package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	memo := make(map[int]int64)

	scanner := bufio.NewScanner(os.Stdin)
	var total int64

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		total += getSteps(val, memo)
	}

	fmt.Printf("total=%d\n", total)
}

func getSteps(n int, memo map[int]int64) int64 {
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		steps++
	}

	memo[n] = steps
	return int64(steps)
}
