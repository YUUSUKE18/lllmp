package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int64)
	totalSteps := int64(0)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		steps := getCollatzSteps(n, cache)
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func getCollatzSteps(n int64, cache map[int64]int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := cache[n]; ok {
		return val
	}

	steps := 0
	nextN := n
	for nextN != 1 {
		if nextN%2 == 0 {
			nextN /= 2
		} else {
			nextN = 3*nextN + 1
		}
		steps++
		cache[nextN] = getCollatzSteps(nextN, cache)
	}

	result := steps - int64(cache[n]) // cache stores steps from n to 1
	cache[n] = result
	return result
}
