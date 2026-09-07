package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	memo := make(map[int]int)
	for _, q := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(q)
		if err != nil || n <= 0 {
			continue
		}
		if memo[n] == 0 {
			memo[n] = f(n, memo)
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}

func f(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + f(n/2, memo)
	}
	return 1 + f(3*n+1, memo)
}
