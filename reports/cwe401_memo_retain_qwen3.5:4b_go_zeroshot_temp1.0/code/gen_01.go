package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	cache := make(map[int64]int)
	scanner := bufio.NewScanner(os.Stdin)

	var total int64
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := fmt.Scanf("%d", &n)
		if n != 1 || err != nil {
			continue
		}

		count := 0
		for n != 1 {
			idx := int64(n)
			v, ok := cache[idx]
			if ok {
				count += v
				break
			}

			cache[idx] = count
			if n%2 == 0 {
				n = n / 2
			} else {
				n = int64(3*n + 1)
			}
		}
		count += cache[int64(n)]

		total += int64(count)
	}

	fmt.Printf("total=%d\n", total)
}
