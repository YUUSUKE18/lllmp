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

		n, err := fmt.Sscanf(line, "%d", &total) // 修正: 変数 n を定義し、スキャンする
		if err != nil || n != 1 {
			continue
		}

		val := int64(n)
		steps := 0

		for val != 1 {
			if steps, ok := cache[val]; ok {
				break
			}
			cache[val] = steps

			if val%2 == 0 {
				val /= 2
			} else {
				val = 3*val + 1
			}
			steps++
		}

		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
