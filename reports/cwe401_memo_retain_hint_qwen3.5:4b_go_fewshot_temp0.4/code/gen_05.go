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
		if n != 1 || err != nil {
			continue
		}
		step := calculateSteps(n, cache)
		total += step
	}

	fmt.Printf("total=%d\n", total)
}

func calculateSteps(n int64, cache map[int64]int64) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := cache[n]; ok {
		return v
	}

	var steps int64 = 1
	cur := n
	for cur != 1 {
		if cur%2 == 0 {
			cur /= 2
		} else {
			cur = 3*cur + 1
		}
		steps++
	}

	cache[n] = steps
	return steps
}
