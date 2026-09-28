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

	// 2. Read the sequence of numbers and build the frequency map
	counts := make(map[int64]int64)
	
	// Read remaining lines
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			// Store the frequency of each number
			counts[num]++
		}
		// Ignore lines that are not valid integers
	}

	// 3. Calculate the number of pairs
	var pairCount int64 = 0

	// Iterate through the unique numbers found in the input
	for x, countX := range counts {
		y := target - x

		// Ensure we only count pairs once (x <= y) to avoid double counting
		if x <= y {
			// Check if y exists in the map
			if countY, found := counts[y]; found {
				if x == y {
					// Case 1: x = y (i.e., 2x = target). We need combinations of identical numbers.
					// Number of pairs = countX choose 2 = countX * (countX - 1) / 2
					if countX >= 2 {
						pairs := countX * (countX - 1) / 2
						pairCount += pairs
					}
				} else {
					// Case 2: x != y. We find all pairs of (x, y).
					// Number of pairs = countX * countY
					pairCount += countX * countY
				}
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
