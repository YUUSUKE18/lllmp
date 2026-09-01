package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int)
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := []int64{}
		for _, s := range []rune(line) {
			if s >= '0' && s <= '9' {
				digit := int64(s - '0')
				parts = append(parts, parts[len(parts)-1]*10+digit)
			} else {
				break
			}
		}
		if len(parts) == 0 {
			continue
		}

		n := parts[0]
		if n < 2 {
			continue
		}

		if val, ok := cache[n]; ok {
			total += val
			continue
		}

		count := 0
		for n != 1 {
			val := int64(0)
			if n%2 == 0 {
				val = n / 2
			} else {
				val = 3*n + 1
			}
			n = val
			count++
		}

		cache[n] = count
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
