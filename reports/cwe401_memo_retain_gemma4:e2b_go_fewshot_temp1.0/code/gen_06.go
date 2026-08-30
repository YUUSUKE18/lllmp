package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	totalMoves := 0
	memo := make(map[int]int)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// Base case: n=1, moves = 0
			continue
		}

		// Check memoization
		if moves, found := memo[n]; found {
			totalMoves += moves
			continue
		}

		// Calculate moves recursively with memoization
		var moves int
		if n%2 == 0 {
			// n is even, n/2
			moves = moves(n/2)
		} else {
			// n is odd, 3n+1
			moves = moves(3*n + 1)
		}

		// Store result and update total
		memo[n] = moves
		totalMoves += moves
	}

	if err := scanner.Err(); err != nil {
		// Handle potential error during scanning, though unlikely for standard input
	}

	fmt.Printf("total=%d\n", totalMoves)
}

func moves(n int) int {
	if n == 1 {
		return 0
	}
	if _, found := memo[n]; found {
		return memo[n]
	}

	var result int
	if n%2 == 0 {
		result = moves(n / 2)
	} else {
		result = moves(3*n + 1)
	}

	memo[n] = result
	return result
}
