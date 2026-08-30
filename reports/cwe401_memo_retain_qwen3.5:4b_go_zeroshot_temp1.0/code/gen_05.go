package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo map[int]int = make(map[int]int)

func collatzStep(n int) int {
	if n == 1 {
		return 0
	}
	switch n % 2 {
	case 0:
		n = n / 2
	default:
		n = 3*n + 1
	}
	if res, ok := memo[n]; ok {
		return 1 + res
	}
	memo[n] = 1 + collatzStep(n)
	return memo[n]
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	total := 0
	var n int
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" || line == "\n" {
			continue
		}
		fmt.Sscanf(line, "%d", &n)
		if err := scanner.Err(); err != nil {
			break
		}
		total += collatzStep(n)
	}

	fmt.Printf("total=%d\n", total)
}
