package main

import (
	"bufio"
	"fmt"
	"os"
)

func solve(n int64) int64 {
	if n == 1 {
		return 0
	}
	memo := make(map[int64]int64)
	var dfs func(n int64) int64
	dfs = func(n int64) int64 {
		if v, ok := memo[n]; ok {
			return v
		}
		var result int64
		if n%2 == 0 {
			result = dfs(n/2) + 1
		} else {
			result = dfs(3*n+1) + 1
		}
		memo[n] = result
		return result
	}
	return dfs(n)
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	mem := make(map[int64]int64)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := []int64{}
		var err error
		for _, s := range parts {
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue
			}
			total += solve(n)
		}
	}

	fmt.Printf("total=%d\n", total)
}
