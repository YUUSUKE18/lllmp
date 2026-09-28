package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int)

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

		if n < 1 {
			continue
		}

		if val, ok := cache[n]; ok {
			total += val
			continue
		}

		step := 0
		curr := int64(n)

		for curr != 1 {
			if curr%2 == 0 {
				curr = curr / 2
			} else {
				curr = 3*curr + 1
			}
			step++
		}

		cache[n] = step
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
