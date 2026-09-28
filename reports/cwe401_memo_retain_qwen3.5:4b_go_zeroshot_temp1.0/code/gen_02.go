package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo map[int]int

func collatzStep(n int) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 1
	if n%2 == 0 {
		steps += collatzStep(n / 2)
	} else {
		steps += collatzStep(3*n + 1)
	}
	memo[n] = steps
	return steps
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	resultSum := 0

	for scanner.Scan() {
		input := scanner.Text()
		if input == "" {
			continue
		}
		var n int64
		fmt.Sscanf(input, "%d", &n)
		if n < 1 {
			continue
		}

		steps := collatzStep(int(n))
		resultSum += steps
	}

	fmt.Printf("total=%d\n", resultSum)
}
