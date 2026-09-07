package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	memo := make(map[int]int)
	for _, q := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(q)
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
		} else if memo[n] != 0 {
			total += memo[n]
		} else {
			memo[n] = 1 + solve(n, memo)
			total += memo[n]
		}
	}
	fmt.Printf("total=%d\n", total)
}

func solve(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + solve(n/2, memo)
	} else {
		return 1 + solve(3*n+1, memo)
	}
}
