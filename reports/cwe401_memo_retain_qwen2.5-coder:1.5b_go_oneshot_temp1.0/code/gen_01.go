package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64
	cache := make(map[int]int64)
	for sc.Scan() {
		if sc.Text() == "" {
			continue
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
		} else {
			total += memoize(cache, n)
		}
	}
	fmt.Printf("total=%d\n", total)
}

func memoize(cache map[int]int64, n int) int64 {
	if result, ok := cache[n]; ok {
		return result
	}
	var result int64
	if n%2 == 0 {
		result = memoize(cache, n/2) + 1
	} else {
		result = memoize(cache, 3*n+1) + 1
	}
	cache[n] = result
	return result
}
