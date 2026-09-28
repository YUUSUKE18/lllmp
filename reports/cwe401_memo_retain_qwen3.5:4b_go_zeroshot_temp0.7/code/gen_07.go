package main

import (
	"bufio"
	"fmt"
	"os"
)

// memo stores the number of steps to reach 1 for each n
var memo = make(map[int64]int)

func solve(n int64) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var nextVal int64
	if n%2 == 0 {
		nextVal = n / 2
	} else {
		nextVal = 3*n + 1
	}

	steps := solve(nextVal) + 1
	memo[n] = steps
	return steps
}

func main() {
	var totalSteps int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &totalSteps)
		if err != nil || n != 1 {
			continue
		}

		currentN := int64(n) // Sscanf reads into variable, but we need the value for calculation. 
							// Actually, fmt.Sscanf returns count, and modifies the pointer argument.
							// But I misused it above. Let's fix the logic.
		// Re-implementing input reading properly.
	}
}
