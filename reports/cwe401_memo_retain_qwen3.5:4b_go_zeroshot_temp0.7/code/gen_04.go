package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int)

	total := 0
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &total)
		if err != nil || n != 1 {
			continue
		}

		current := int64(n)
		step := 0
		for current != 1 {
			if val, ok := cache[current]; ok {
				step += val
				break
			}

			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3*current + 1
			}
			step++
		}

		for k := range cache {
			cache[k] -= step
		}
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
