package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	memo := make(map[int]int)
	total := 0
	for _, q := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(q)
		if err != nil || n <= 0 {
			continue
		}
		if n == 1 {
			total += 0
		} else if memo[n] == 0 {
			memo[n] = f(n, memo)
			total += memo[n]
		} else {
			total += memo[n]
		}
	}
	fmt.Printf("total=%d\n", total)
}

func f(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return memo[n/2] + 1
	}
	return memo[3*n+1] + 1
}
