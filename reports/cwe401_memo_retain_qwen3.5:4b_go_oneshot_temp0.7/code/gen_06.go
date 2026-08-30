package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo map[int]int

func collatzStep(n int) int {
	if n == 1 {
		return 0
	}

	if val, ok := memo[n]; ok {
		return val
	}

	steps := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}

	steps += collatzStep(n)
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo = make(map[int]int)
	totalSteps := 0

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil || n < 1 {
			continue
		}

		steps := collatzStep(n)
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}
