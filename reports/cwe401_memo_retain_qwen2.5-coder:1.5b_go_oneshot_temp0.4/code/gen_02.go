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
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil || n == 0 {
			continue
		}
		if memo[n] != 0 {
			total += memo[n]
			continue
		}
		memo[n] = computeSteps(n, memo)
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}

func computeSteps(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + computeSteps(n/2, memo)
	}
	return 1 + computeSteps(3*n+1, memo)
}
