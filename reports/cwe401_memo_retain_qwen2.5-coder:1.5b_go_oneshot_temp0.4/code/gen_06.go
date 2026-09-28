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
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
		} else if memo[n] != 0 {
			total += memo[n]
		} else {
			memo[n] = 1 + calculateSteps(n, memo)
			total += memo[n]
		}
	}
	fmt.Printf("total=%d\n", total)
}

func calculateSteps(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + calculateSteps(n/2, memo)
	} else {
		return 1 + calculateSteps(3*n+1, memo)
	}
}
