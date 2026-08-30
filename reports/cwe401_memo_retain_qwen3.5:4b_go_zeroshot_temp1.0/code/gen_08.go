package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo map[int]int64 = make(map[int]int64)

func collatzStep(n int64) int {
	if val, ok := memo[n]; ok {
		return int(val)
	}
	var steps int64 = 0
	for n > 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		steps++
	}
	memo[n] = steps
	return int(steps)
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		fmt.Scanf("%d", &n)
		if err := scanner.Err(); err != nil {
			continue
		}

		total += collatzStep(n)
	}

	fmt.Printf("total=%d\n", total)
}
