package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	max := 0
	first := true
	memo := make(map[int]int)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > max {
			max = n
			first = false
		}
		if memo[n] == 0 {
			memo[n] = computeSteps(n)
		}
	}
	fmt.Printf("total=%d\n", memo[1])
}

func computeSteps(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + computeSteps(n/2)
	}
	return 1 + computeSteps(3*n + 1)
}
