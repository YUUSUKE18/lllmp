package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	cache := make(map[int64]int)
	scanner := bufio.NewScanner(os.Stdin)
	total := 0

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

		if n < 1 {
			continue
		}

		if val, ok := cache[n]; ok {
			total += val
			continue
		}

		steps := 0
		curr := n
		for curr != 1 {
			if curr%2 == 0 {
				curr /= 2
			} else {
				curr = 3*curr + 1
			}
			steps++
		}

		cache[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
