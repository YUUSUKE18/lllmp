package main

import (
	"fmt"
	"math"
	"os"
	"strings"
	"sort"
)

// Memoization cache for the number of steps
var memo = make(map[int]int)

// computeSteps computes the number of steps to reach 1 for a given number
func computeSteps(n int) int {
	if n == 1 {
		return 0
	}

	// If we've already computed this, return the stored result
	if steps, ok := memo[n]; ok {
		return steps
	}

	// Initialize steps for this number
	steps := 0

	// Apply the transformation until we reach 1
	for n != 1 {
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		steps++
	}

	// Store the result in the memoization map
	memo[n] = steps
	return steps
}

// main reads input, processes each query, and computes the total steps
func main() {
	var numbers []int

	// Read all lines from standard input
	for line := range os.Text {
		// Ignore empty lines
		if line == "" {
			continue
		}

		// Check if the line is a valid integer
		if m, err := strconv.Atoi(string(line)); err != nil {
			continue
		}

		// Add the integer to the list
		numbers = append(numbers, m)
	}

	// Sort the numbers to process smaller values first
	sort.Ints(numbers)

	// Calculate the total steps
	total := 0
	for _, num := range numbers {
		total += computeSteps(num)
	}

	// Output the result
	fmt.Printf("total=%d\n", total)
}
