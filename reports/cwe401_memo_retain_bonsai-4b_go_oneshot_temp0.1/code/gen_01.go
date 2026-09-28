package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func countSteps(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != nil {
		return memo[n]
	}
	if n%2 == 0 {
		next := n / 2
		steps := 1 + countSteps(next)
	} else {
		next := 3*n + 1
		steps := 1 + countSteps(next)
	}
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var totalSteps int
	for _, line := range sc.Text().Split("\n", -1) {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		if !strconv.Atoi(line) {
			continue
		}
		n := int(line)
		steps := countSteps(n)
		totalSteps += steps
	}
	fmt.Printf("total=%d\n", totalSteps)
}
