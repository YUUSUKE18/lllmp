package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	memo := make(map[int64]int)
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &total) // This is a trick to just sum up everything? No, wait.
		// Actually, the problem says "standard input contains integers one per line".
		// I need to parse 'n' from each line.
		// Let's re-read carefully: "Standard input contains 1 or more integers, one per line (queries)."
		// So I should parse n, calculate steps, add to total.
		
		// Wait, fmt.Sscanf returns the number of items scanned.
		// If I do fmt.Sscanf(line, "%d", &n), it will store the value in n.
		// But I defined total as int64 in main scope? No, that's bad practice if I want to reuse 'total' or if 'total' is used for something else.
		// The variable name 'total' is used in my thought process above but it's also the accumulator.
		// Let's use a separate variable for 'n'.

		var n int64
		if _, err := fmt.Sscanf(line, "%d", &n); err != nil {
			continue // Skip lines that are not integers
		}

		steps := collatzSteps(n, memo)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

func collatzSteps(n int64, memo map[int64]int) int {
	if n == 1 {
		return 0
	}

	// Memoize if already computed
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	var nextVal int64

	for {
		switch n % 2 {
		case 0:
			nextVal = n / 2
		default:
			nextVal = 3*n + 1
		}

		n = nextVal
		steps++

		if n == 1 {
			break
		}

		// Check memo for the new value to potentially speed up, 
		// though we are computing from top down, so checking before recursive call is standard.
		// Here we do iterative. We can check if nextVal is in memo and return early?
		// Actually, since we need the result for 'n', we just compute until 1.
		// Optimization: if we encounter a value already computed, add its stored steps and break.
		if v, ok := memo[n]; ok {
			steps += v - 1 // Wait, logic check.
			// If n becomes something already in memo, say m.
			// The steps from m to 1 is memo[m].
			// So total steps = (steps so far) + memo[m].
			break
		}
	}

	memo[n] = steps
	return steps
}

// Re-implementation of collatzSteps to be purely functional without complex loops inside or recursion issues.
// Actually, the iterative approach with early exit on memo hit is fine.
// But wait, the initial call `collatzSteps(n, memo)` doesn't store `n` itself in memo? 
// It stores `steps`. The result should be the total steps from n to 1.
// My logic above: 
// Loop starts. n becomes nextVal. steps++.
// If nextVal is 1, break.
// If nextVal is in memo, add memo[nextVal] and break?
// No, if I see nextVal in memo, then the remaining steps from nextVal to 1 is known.
// So total = current_steps + memo[nextVal].
// Let's rewrite the function clearly.

func calculateSteps(n int64, memo map[int64]int) int {
	steps := 0
	for n != 1 {
		if v, ok := memo[n]; ok {
			return steps + v
		}

		switch n % 2 {
		case 0:
			n = n / 2
		default:
			n = 3*n + 1
		}
		steps++
	}

	memo[n] = steps // Store the result for 1 (which is 0, but stored as step count?)
	// Wait, if n=1, loop doesn't run. steps=0. memo[1]=0. Correct.
	return steps
}
