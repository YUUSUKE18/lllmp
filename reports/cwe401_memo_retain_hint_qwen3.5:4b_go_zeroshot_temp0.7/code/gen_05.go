package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cached := make(map[int]int64)
	total := int64(0)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		step := solve(n, cached)
		total += step
	}

	fmt.Printf("total=%d\n", total)
}

func solve(n int, cache map[int]int64) int64 {
	if n == 1 {
		return 0
	}

	val, ok := cache[n]
	if ok {
		return val
	}

	step := int64(0)
	if n%2 == 0 {
		next := n / 2
	} else {
		next = 3*n + 1
	}

	subStep := solve(int(next), cache)
	val = subStep + 1
	cache[n] = val
	return val
}
