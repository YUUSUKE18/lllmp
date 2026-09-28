package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
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
		if memo[n] == 0 {
			memo[n] = calculateSteps(n, memo)
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}

func calculateSteps(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + calculateSteps(n/2, memo)
	}
	return 1 + calculateSteps(3*n+1, memo)
}
