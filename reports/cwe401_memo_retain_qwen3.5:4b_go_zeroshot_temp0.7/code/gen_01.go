package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo map[int]int64

func collatzStep(n int) {
	if n == 1 {
		return
	}
	memo[n] = int64(0)
	memo[3*n+1]++
	collatzStep(int(3*n + 1))
	memo[n] = memo[n] + memo[3*n+1]
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo = make(map[int]int64)

	var total int64
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := fmt.Sscanf(line, "%d", &n)
		if n != 1 || err != nil {
			continue
		}

		if collatzStep(n) == 0 {
			continue
		}

		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}
