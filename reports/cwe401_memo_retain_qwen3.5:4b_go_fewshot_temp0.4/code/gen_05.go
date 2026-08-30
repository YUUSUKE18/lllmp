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
		n, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || n != 1 {
			continue
		}
		result := collatzStep(n)
		total += result
	}

	fmt.Printf("total=%d\n", total)
}

func collatzStep(n int64) int64 {
	if v, ok := cache[n]; ok {
		return v
	}
	step := int64(0)
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		step++
	}
	cache[n] = step
	return step
}
