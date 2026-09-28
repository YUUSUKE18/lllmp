package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		steps := 0
		for n != 1 {
			key := n
			if val, ok := cache[key]; ok {
				steps += val
				break
			}
			cache[key] = steps

			if n%2 == 0 {
				n = n / 2
			} else {
				n = 3*n + 1
			}
			steps++
		}

		total += cache[1]
	}

	fmt.Printf("total=%d\n", total)
}
