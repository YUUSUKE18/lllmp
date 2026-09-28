package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var cache = make(map[int64]int)

func steps(n int64) int {
	if n == 1 {
		return 0
	}
	if v, ok := cache[n]; ok {
		return v
	}

	nextVal := n
	if nextVal%2 == 0 {
		nextVal = nextVal / 2
	} else {
		nextVal = 3*nextVal + 1
	}

	stepsFromNext := steps(nextVal)
	cache[n] = stepsFromNext + 1
	return cache[n]
}

func main() {
	var totalSteps int64
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		totalSteps += steps(n)
	}

	fmt.Printf("total=%d\n", totalSteps)
}
