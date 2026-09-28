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
		if err != nil {
			continue
		}
		if memo[n] > 0 {
			total += memo[n]
			continue
		}
		memo[n] = countSteps(n)
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}

func countSteps(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + countSteps(n/2)
	}
	return 1 + countSteps(3*n + 1)
}
