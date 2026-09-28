package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int64]int)

func collatzStep(n int64) int {
	if v, ok := memo[n]; ok {
		return v
	}
	var steps int
	for n != 1 {
		steps++
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
	}
	memo[n] = steps
	return steps
}

func main() {
	var scanner *bufio.Scanner
	scanner = bufio.NewScanner(os.Stdin)
	total := int64(0)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		val, err := fmt.Sscanf(line, "%d", &total) // Using Sscanf with a pointer to accumulate directly? No.
		// Let's fix the parsing logic properly.
	}
	// Re-reading the loop logic for proper parsing
	total = int64(0)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		var n int64
		err := fmt.Sscanf(line, "%d", &n)
		if err != nil || n <= 0 {
			continue // Skip invalid or non-positive integers as per "1以上の整数" requirement, though spec implies valid input.
		}
		steps := collatzStep(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
