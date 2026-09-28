package main

import (
	"bufio"
	"fmt"
)

var memo = make(map[int]int64)

func collatzStep(n int) int {
	if n == 1 {
		return 0
	}
	if res, ok := memo[n]; ok {
		return int(res)
	}
	var next int
	if n%2 == 0 {
		next = n / 2
	} else {
		next = 3*n + 1
	}

	steps := collatzStep(next)
	memo[n] = int64(1) + steps
	return steps
}

func main() {
	reader := bufio.NewReader(stdin())
	var nStr string
	totalSteps := int64(0)

	for {
		nStr, _ = reader.ReadString('\n')
		nStr = string(nStr)[:len(nStr)-1] // Remove newline
		if nStr == "" || nStr[0] == ' ' {
			continue
		}
		
		var n int64
		_, err := fmt.Sscanf(nStr, "%d", &n)
		if err != nil {
			continue
		}
		if n < 1 {
			continue
		}

		if res, ok := memo[n]; ok {
			totalSteps += res
		} else {
			stepCount := collatzStep(int(n))
			memo[n] = int64(stepCount)
			totalSteps += stepCount
		}
	}
	
	fmt.Printf("total=%d\n", totalSteps)
}
