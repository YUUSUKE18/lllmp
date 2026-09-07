package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count, total int
	cache := make(map[int]int)
	for sc.Scan() {
		q := sc.Text()
		if len(q) > 0 {
			num, err := strconv.Atoi(q)
			if err != nil {
				continue
			}
			total += helper(num, cache)
			count++
		}
	}
	fmt.Printf("total=%d\n", total)
}

func helper(n int, cache map[int]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := cache[n]; ok {
		return val
	}
	if n%2 == 0 {
		result := 1 + helper(n/2, cache)
		cache[n] = result
		return result
	} else {
		result := 1 + helper(3*n+1, cache)
		cache[n] = result
		return result
	}
}
