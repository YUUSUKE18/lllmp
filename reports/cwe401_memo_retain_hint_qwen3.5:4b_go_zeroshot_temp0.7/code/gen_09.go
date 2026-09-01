package main

import (
	"bufio"
	"fmt"
)

// memoizedCollatz stores the number of steps to reach 1 for each starting integer.
var memoizedCollatz map[int]int

func collatzSteps(n int) int {
	if n == 1 {
		return 0
	}
	
	// Check if the value is already computed
	if val, ok := memoizedCollatz[n]; ok {
		return val
	}

	var steps int
	
	// Determine the next value based on parity
	nextVal := n
	if n%2 == 0 {
		nextVal = n / 2
	} else {
		nextVal = 3*n + 1
	}

	// Recursively get steps from the next value
	steps += collatzSteps(nextVal)

	// Store and return the result
	memoizedCollatz[n] = steps
	return steps
}

func main() {
	scanner := bufio.NewScanner(stdIn)
	var total int

	for scanner.Scan() {
		line := scanner.Text()
		
		// Skip empty lines or lines that cannot be parsed as integers
		if line == "" || isInvalidInteger(line) {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		steps := collatzSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

// isInvalidInteger checks if the line contains valid integer characters only
func isInvalidInteger(line string) bool {
	for _, r := range line {
		if r < '0' || r > '9' {
			return true
		}
	}
	return false
}
