package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memo stores the number of steps from a number to 1
var memo = make(map[int64]int)

// getSteps calculates the steps for n to reach 1 using memoization
func getSteps(n int64) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	nextN := n / 2
	if n%2 != 0 {
		nextN = 3*n + 1
	}

	steps := getSteps(nextN) + 1
	memo[n] = steps
	return steps
}

func main() {
	var total int64
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		token := scanner.Text()
		
		// Ignore empty tokens if any (Scanner usually skips whitespace, but safe to check length)
		if len(token) == 0 {
			continue
		}

		val, err := strconv.ParseInt(token, 10, 64)
		if err != nil || val < 1 {
			continue
		}

		steps := getSteps(val)
		total += int64(steps)
	}

	if scanner.Err() != nil {
		return
	}

	fmt.Printf("total=%d\n", total)
}
