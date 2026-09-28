package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int64]int)

func solve(n int64, depth int, result *int64) {
	if n == 1 {
		if *result < depth {
			*result = depth
		}
		return
	}
	key := int64(n)
	if memo[key] > depth {
		memo[n] = int(depth + memo[memo[key]])
		return
	}
	next := 0
	if n%2 == 0 {
		next = n / 2
	} else {
		next = 3*n + 1
	}
	memo[key] = depth + solve(next, depth+1, result)
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64
	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		n, err := fmt.Sscanf(text, "%d", &total)
		if err != nil || n != 1 {
			continue
		}
		n = int64(n)
		var step int64
		solve(n, 0, &step)
		total += step
	}
	fmt.Printf("total=%d\n", total)
}
