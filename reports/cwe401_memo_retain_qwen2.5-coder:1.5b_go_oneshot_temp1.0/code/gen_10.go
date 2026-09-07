package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = map[int]int{}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if memo[n] == 0 {
			memo[n] = findSteps(n)
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}

func findSteps(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + findSteps(n/2)
	}
	return 1 + findSteps(3*n + 1)
}
