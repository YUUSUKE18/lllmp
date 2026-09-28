package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 1. Read the target value T
	if !scanner.Scan() {
		// Handle empty input
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// Handle error if target is not a valid integer
		return
	}

	// 2. Read the sequence of numbers
	counts := make(map[int64]int64)
	
	// Read subsequent lines until EOF
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not valid integers
		}
		
		// Store frequency
		counts[num]++
	}

	// 3. Calculate the number of pairs
	var pairCount int64 = 0

	// Iterate over the unique numbers found
	for x, freqX := range counts {
		y := target - x

		// Ensure we only process pairs (x, y) where x <= y to avoid double counting
		if x > y {
			continue
		}

		if freqY, exists := counts[y]; exists {
			if x == y {
				// Case 1: x = y (i.e., 2x = target). We need to choose 2 distinct indices from freqX occurrences.
				// Number of pairs = freqX * (freqX - 1) / 2
				if freqX >= 2 {
					pairs := freqX * (freqX - 1) / 2
					pairCount += pairs
				}
			} else {
				// Case 2: x != y. We count pairs (x, y).
				// Since we iterate over all x, we only count when x < y.
				// This ensures we count the pair {x, y} exactly once.
				pairs := freqX * freqY
				pairCount += pairs
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
