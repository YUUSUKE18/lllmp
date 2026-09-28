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
		
		num, err := fmt.Sscanf(line, "%d", &totalNum)
		if err != nil || totalNum <= 0 {
			continue
		}
		totalNum = int64(totalNum)

		steps := calculateSteps(totalNum, cache)
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func calculateSteps(n int64, cache map[int64]int64) int64 {
	if n == 1 {
		return 0
	}

	if val, ok := cache[n]; ok {
		return val
	}

	steps := int64(0)
	
	if n%2 == 0 {
		next := n / 2
	} else {
		next = 3*n + 1
	}

	steps += calculateSteps(next, cache)

	cache[n] = steps
	return steps
}
