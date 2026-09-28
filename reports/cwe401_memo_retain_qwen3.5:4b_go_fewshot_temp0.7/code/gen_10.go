package main

import (
	"bufio"
	"fmt"
	"os"
)

// memo stores the number of steps to reach 1 for each starting number.
var memo = make(map[int]int)

func steps(n int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	stepsCount := 0
	nextVal := n
	for nextVal != 1 {
		if nextVal%2 == 0 {
			nextVal = nextVal / 2
		} else {
			nextVal = 3*nextVal + 1
		}
		stepsCount++
	}

	memo[n] = stepsCount
	return stepsCount
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSteps := 0

	for sc.Scan() {
		line := sc.Text()
		
		// Skip empty lines or lines that don't look like integers
		if line == "" || line == "\n" {
			continue
		}
		
		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		totalSteps += steps(n)
	}

	fmt.Printf("total=%d\n", totalSteps)
}
