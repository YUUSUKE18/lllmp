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
	first := true

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if first {
			first = false
			total += collatzStep(n, cache)
		} else {
			total += collatzStep(n, cache)
		}
	}

	fmt.Printf("total=%d\n", total)
}

func collatzStep(start int64, cache map[int64]int) int {
	if v, ok := cache[start]; ok {
		return v
	}

	step := 0
	current := start
	for current != 1 {
		if current%2 == 0 {
			current = current / 2
		} else {
			current = 3*current + 1
		}
		step++
		cache[current] = step
	}

	return cache[start]
}
