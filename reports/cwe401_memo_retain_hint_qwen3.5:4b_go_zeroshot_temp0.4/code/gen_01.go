package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int)
	totalSteps := 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err := scanner.Err(); err != nil {
			break
		}

		steps := 0
		for n > 1 {
			if val, ok := cache[n]; ok {
				steps += val
				break
			}
			cache[n] = steps

			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			steps++
		}
		totalSteps += cache[n]
	}

	fmt.Printf("total=%d\n", totalSteps)
}
