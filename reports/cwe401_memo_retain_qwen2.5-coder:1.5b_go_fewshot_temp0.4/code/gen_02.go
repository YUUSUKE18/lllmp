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
	for _, n := range strings.Fields(sc.Text()) {
		if _, ok := memo[n]; !ok {
			memo[n] = compute(n, memo)
			total += memo[n]
		}
	}
	fmt.Printf("total=%d\n", total)
}

func compute(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + compute(n/2, memo)
	}
	return 1 + compute(3*n+1, memo)
}
