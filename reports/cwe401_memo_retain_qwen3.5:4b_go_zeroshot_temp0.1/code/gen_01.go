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

		n, err := fmt.Sscanf(line, "%d", &total)
		if n != 1 || err != nil {
			continue
		}

		val := int64(n)
		step := 0

		for val != 1 {
			if stepVal, ok := cache[val]; ok {
				step += stepVal
				break
			}

			cache[val] = step

			if val%2 == 0 {
				val = val / 2
			} else {
				val = 3*val + 1
			}
			step++
		}

		total += cache[1]
	}

	fmt.Printf("total=%d\n", total)
}
