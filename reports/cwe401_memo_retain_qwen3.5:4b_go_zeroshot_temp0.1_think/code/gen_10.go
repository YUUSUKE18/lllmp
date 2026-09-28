package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int64)

func getSteps(n int64) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	var nextVal int64
	if n%2 == 0 {
		nextVal = n / 2
	} else {
		nextVal = 3*n + 1
	}

	steps := getSteps(nextVal) + 1
	memo[n] = steps
	return steps
}

func main() {
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		steps := getSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
