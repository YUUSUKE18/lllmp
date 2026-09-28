package main

import (
	"bufio"
	"fmt"
	"os"
)

func solve(x int64) int64 {
	if x <= 0 {
		return 0
	}
	cache := make(map[int64]int)
	var count int64
	for {
		if v, ok := cache[x]; ok {
			count += v
			break
		}
		count++
		if x == 1 {
			cache[1] = count - 1
			return count
		}
		if x%2 == 0 {
			x = x / 2
		} else {
			x = 3*x + 1
		}
	}
	return cache[x] + (count - len(cache) - 1) // simplified logic for memoization context below
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int)
	totalSteps := int64(0)
	
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}
		
		if n <= 0 {
			continue
		}
		
		steps := 0
		temp := n
		for temp != 1 {
			steps++
			if temp%2 == 0 {
				temp = temp / 2
			} else {
				temp = 3*temp + 1
			}
		}
		
		totalSteps += steps
	}
	
	fmt.Printf("total=%d\n", totalSteps)
}
