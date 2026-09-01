package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memo stores the step counts for each number encountered.
var memo map[int]int = make(map[int]int)

func solve(n int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	steps := 0
	nextN := n

	// Perform Collatz sequence steps until reaching 1
	for nextN != 1 {
		if nextN%2 == 0 {
			nextN /= 2
		} else {
			nextN = 3*nextN + 1
		}
		steps++
	}

	// Cache the result
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	for sc.Scan() {
		line := sc.Text()
		// Skip empty lines or lines that cannot be parsed as integers
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// Calculate steps for the current query and add to total
		steps := solve(n)
		totalSteps += int64(steps)
	}

	// Output the result in the specified format
	fmt.Printf("total=%d\n", totalSteps)
}
