package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)

		if err := scanner.Err(); err != nil && err.Error() != "EOF" {
			continue
		}

		if _, ok := memo[n]; !ok {
			memo[n] = 0
		}

		steps := memo[n]
		if n == 1 {
			steps = 0
		} else if n%2 == 0 {
			next := n / 2
			steps += memo[next]
		} else {
			next := 3*n + 1
			steps += memo[next]
		}

		fmt.Printf("total=%d\n", steps)
	}
}
