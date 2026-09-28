package main

import (
	"bufio"
	"fmt"
)

// memoizes the number of steps to reach 1 for each number
var memo = map[int]int{}

func steps(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		result := steps(n / 2)
	} else {
		result := 1 + steps(3*n + 1)
	}
	memo[n] = result
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var totalSteps 0
	for _, line := range sc.Text() {
		// Skip empty lines and non-integer lines
		lineTrimmed := strings.TrimSpace(line)
		if lineTrimmed == "" {
			continue
		}
		// Parse integers from space-separated values
		nums := strings.Fields(lineTrimmed)
		for _, s := range nums {
			if !s.isdigit() {
				continue
			}
			n := int(s)
			if n > 0 {
				steps(n)
			}
		}
	}
	fmt.Printf("total=%d\n", totalSteps)
}
