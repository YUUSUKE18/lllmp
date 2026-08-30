package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	cache := make(map[int64]int)
	sc := bufio.NewScanner(os.Stdin)
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
		result := calculate(n, cache)
		total += result
	}
	fmt.Printf("total=%d\n", total)
}

func calculate(n int64, cache map[int64]int) int {
	if n == 1 {
		return 0
	}
	if v, ok := cache[n]; ok {
		return v
	}
	steps := 0
	if n%2 == 0 {
		steps += calculate(n/2, cache)
	} else {
		next := 3*n+1
		if next < 1 {
			next = int64(3*n + 1) // Ensure it stays within valid integer range logic if needed, though problem guarantees fitting in 64bit
		}
		steps += calculate(next, cache)
	}
	cache[n] = steps
	return steps
}
