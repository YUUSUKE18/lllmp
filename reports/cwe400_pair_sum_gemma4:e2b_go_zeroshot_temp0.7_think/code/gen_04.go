package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 1. Read the target value T
	if !scanner.Scan() {
		// Handle empty input
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// Handle error if target is not a valid integer
		return
	}

	// 2. Read the sequence of numbers and count frequencies
	counts := make(map[int64]int64)
	
	// Read remaining lines for numbers
	for scanner.Scan() {
		line := scanner.Text()
		// Ignore empty lines
		if line == "" {
			continue
		}
		
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}
		
		counts[num]++
	}

	// 3. Calculate the number of pairs
	var pairCount int64 = 0

	// Iterate through the unique numbers found
	for x, countX := range counts {
		y := target - x

		// Ensure we only count pairs (x, y) where x <= y to avoid double counting
		if x < y {
			// Case 1: x and y are distinct
			if countY, ok := counts[y]; ok {
				pairCount += countX * countY
			}
		} else if x == y {
			// Case 2: x and y are the same (2x = target)
			// We need to choose 2 elements from countX occurrences: countX * (countX - 1) / 2
			if countX >= 2 {
				pairCount += countX * (countX - 1) / 2
			}
		}
		// If x > y, we skip because this pair (y, x) would have been counted when iterating over y.
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
