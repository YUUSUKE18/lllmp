package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int)

func nextStep(n int64) int64 {
	if n == 1 {
		return 1
	}
	if v, ok := memo[n]; ok {
		return v
	}
	nextVal := n
	if n%2 == 0 {
		nextVal = n / 2
	} else {
		nextVal = 3*n + 1
	}
	steps := 1 + nextStep(nextVal)
	memo[n] = steps
	return steps
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	totalSteps := 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		steps := nextStep(n)
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}
