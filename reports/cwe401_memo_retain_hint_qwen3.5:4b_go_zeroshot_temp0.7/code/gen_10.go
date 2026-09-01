package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cache := make(map[int]int64)
	totalSteps := int64(0)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err := scanner.Err(); err != nil {
			break
		}

		if _, ok := cache[n]; ok {
			totalSteps += cache[n]
			continue
		}

		steps := int64(0)
		temp := n
		for temp != 1 {
			cache[temp] = steps
			if temp%2 == 0 {
				temp /= 2
			} else {
				temp = 3*temp + 1
			}
			steps++
		}
		cache[1] = 0

		totalSteps += cache[n]
	}

	fmt.Printf("total=%d\n", totalSteps)
}
