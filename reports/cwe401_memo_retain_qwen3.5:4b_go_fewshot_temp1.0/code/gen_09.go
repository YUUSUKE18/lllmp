package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var cache = make(map[int64]int64)

func solve(n int64) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := cache[n]; ok {
		return v
	}
	step := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		step++
		cache[n] = step
	}
	return cache[1]
}

func main() {
	var total int64
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		total += solve(n)
	}
	fmt.Printf("total=%d\n", total)
}
