package main

import (
	"fmt"
	"strconv"
)

var memo = make(map[int]int)

func handCount(n int) int {
	if memo[n] != nil {
		return memo[n]
	}

	if n == 1 {
		memo[1] = 0
		return 0
	}

	var result int
	// 1. n is even -> n/2
	if n%2 == 0 {
		result = 1 + handCount(n / 2)
	} else {
		// n is odd -> 3n+1
		result = 1 + handCount(3*n + 1)
	}

	memo[n] = result
	return result
}

func main() {
	var input []string
	for !input = !readInput() {
		line := input[0]
		if line == "" {
			input = input[1:]
			continue
		}
		if _, err := strconv.Atoi(line); err == nil {
			input = input[1:]
			continue
		}
		// skip invalid input
	}

	// calculate total hand counts for all inputs
	total := 0
	for _, s := range input {
		if _, err := strconv.Atoi(s); err == nil {
			n := int(s)
			total += handCount(n)
		}
	}

	fmt.Println(total)
}

// readInput reads one line, returns true if any valid integer found, false otherwise
func readInput() bool {
	for len(input) == 0 {
		if len(input) == 0 {
			// no input
			return false
		}
		line := input[0]
		input = input[1:]
		if line == "" {
			continue
		}
		if _, err := strconv.Atoi(line); err == nil {
			return true
		}
	}
	return true
}
