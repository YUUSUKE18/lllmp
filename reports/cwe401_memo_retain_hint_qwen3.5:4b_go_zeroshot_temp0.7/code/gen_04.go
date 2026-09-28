package main

import (
	"bufio"
	"fmt"
	"os"
)

// memo stores the number of steps required to reach 1 from each integer.
// Key: int64, Value: int64 (steps).
var memo = make(map[int64]int64)

func solveCollatz(n int64) int64 {
	// If n is already in memory, return the cached steps.
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	current := n

	for current != 1 {
		// Ensure the next value fits within the range of int64 (as per spec).
		// The problem states intermediate values fit in 64-bit integers.
		if current%2 == 0 {
			current = current / 2
		} else {
			current = 3*current + 1
		}
		steps++
	}

	memo[n] = steps
	return steps
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		// Try to parse the integer. If it fails, skip the line.
		n, ok := newScanner(line).nextToken().Int64()
		if !ok || n < 1 {
			continue
		}

		steps := solveCollatz(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

// Scanner wrapper to handle input parsing more flexibly if needed, 
// though standard strconv.Atoi is sufficient for the spec.
type newScanner struct {
	r *bufio.Scanner
}

func (s *newScanner) nextToken() tokenReader {
	var str string
	s.r.Scan()
	str = s.r.Text()
	return &tokenReader{str: str}
}

type tokenReader struct {
	str string
}

func (t *tokenReader) Int64() (int64, bool) {
	var n int64
	_, err := fmt.Sscanf(t.str, "%d", &n)
	if err != nil {
		return 0, false
	}
	return n, true
}
