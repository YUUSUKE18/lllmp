package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int)

func steps(n int64) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	nextN := n
	if n%2 == 0 {
		nextN = n / 2
	} else {
		nextN = 3*n + 1
	}

	stepsCount := 1 + steps(nextN)
	memo[n] = stepsCount
	return stepsCount
}

func main() {
	var total int64
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil || val < 1 {
			continue
		}

		steps := steps(val)
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
