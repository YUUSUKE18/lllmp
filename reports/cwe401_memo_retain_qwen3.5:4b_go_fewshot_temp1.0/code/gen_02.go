package main

import (
	"bufio"
	"fmt"
	"os"
)

// memo stores the number of steps for each integer seen so far.
var memo = make(map[int64]int64)

func calculateSteps(n int64) int64 {
	if n == 1 {
		return 0
	}
	
	// Check if we already have the result
	if res, ok := memo[n]; ok {
		return res
	}
	
	steps := 0
	current := n
	
	for current != 1 {
		switch {
		case current%2 == 0:
			current /= 2
		default:
			current = 3*current + 1
		}
		
		steps++
		
		// If this new value has been computed before, add its stored steps
		if _, exists := memo[current]; exists {
			break
		}
	}
	
	// Cache the result: steps taken from n to 1 + steps taken from 1 to current's base (which is 0 additional)
	// Actually, since we stop when we hit a known value or 1, 
	// and memo[n] = steps(n->...) + memo[next], 
	// but the loop above accumulates step-by-step.
	// Let's refactor slightly for clarity: use recursion with memoization.

	return calculateStepsRecursive(n)
}

func calculateStepsRecursive(n int64) int64 {
	if n == 1 {
		return 0
	}
	
	if res, ok := memo[n]; ok {
		return res
	}

	var next int64
	if n%2 == 0 {
		next = n / 2
	} else {
		next = 3*n + 1
	}

	steps := 1 + calculateStepsRecursive(next)
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSteps := int64(0)
	
	for sc.Scan() {
		line := sc.Text()
		
		// Skip empty lines or lines that cannot be parsed as integers
		line = line.TrimSpace()
		if len(line) == 0 {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		steps := calculateSteps(n)
		totalSteps += steps
	}
	
	fmt.Printf("total=%d\n", totalSteps)
}
