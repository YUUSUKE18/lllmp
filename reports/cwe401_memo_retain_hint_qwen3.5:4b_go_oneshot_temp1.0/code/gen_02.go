package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	cache := make(map[int]int)
	total := 0

	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		hand := collatzStep(n, cache)
		total += hand
	}

	fmt.Printf("total=%d\n", total)
}

func collatzStep(n int, cache map[int]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := cache[n]; ok {
		return val
	}

	steps := 0
	val := n
	for val != 1 {
		if val%2 == 0 {
			val = val / 2
		} else {
			val = 3*val + 1
		}
		steps++
	}
	cache[n] = steps
	return steps
}
