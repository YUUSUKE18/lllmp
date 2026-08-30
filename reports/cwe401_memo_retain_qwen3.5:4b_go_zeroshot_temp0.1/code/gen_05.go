package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int)

	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := fmt.Sscanf(line, "%d", &total) // This is a placeholder logic to read n and accumulate
		if err != nil || n != 1 {
			continue
		}
		break
	}

	// Re-implementing the loop correctly for each query
	scanner = bufio.NewScanner(os.Stdin)
	total = 0
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		var n int64
		fmt.Sscanf(line, "%d", &n)
		if n < 1 {
			continue
		}

		steps := 0
		for n != 1 {
			val, ok := cache[n]
			if !ok {
				cache[n] = steps
			} else {
				steps += val
				break
			}
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			steps++
		}
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
