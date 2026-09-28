package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if memo[n] != 0 {
			total += memo[n]
			continue
		}
		if n == 1 {
			total++
			memo[n] = total
			continue
		}
		memo[n] = 1 + solve(n, memo)
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}

func solve(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + solve(n/2, memo)
	}
	return 1 + solve(3*n+1, memo)
}
