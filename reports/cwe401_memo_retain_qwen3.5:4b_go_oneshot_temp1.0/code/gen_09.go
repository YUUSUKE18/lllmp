package main

import (
	"bufio"
	"fmt"
	"os"
)

func collatzStep(n int64) int64 {
	step := 0
	if n == 1 {
		return step
	}
	cache := map[int64]int64{1: 0}
	var recurse func(int64, int64) int64
	recurse = func(n int64, s int64) int64 {
		if val, ok := cache[n]; ok {
			return s + val
		}
		if n%2 == 0 {
			step = recurse(n/2, s+1)
		} else {
			step = recurse(3*n+1, s+1)
		}
		cache[n] = step
		return step
	}
	return recurse(n, 0)
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err := sc.Err(); err != nil {
			continue
		}
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
