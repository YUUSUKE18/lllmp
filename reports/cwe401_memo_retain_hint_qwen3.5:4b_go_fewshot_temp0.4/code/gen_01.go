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

		if val, ok := cache[n]; ok {
			total += val
			continue
		}

		count := 0
		curr := n
		for curr != 1 {
			if curr%2 == 0 {
				curr /= 2
			} else {
				curr = 3*curr + 1
			}
			count++
		}

		cache[n] = count
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
