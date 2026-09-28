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

	// 1. Read the target value T (first line)
	if !scanner.Scan() {
		// Handle empty input
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// Invalid target format
		return
	}

	// 2. Read the sequence of numbers (subsequent lines)
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
		// Ignore lines that are not valid integers
	}

	// 3. Calculate frequencies of all numbers
	freq := make(map[int64]int64)
	for _, num := range numbers {
		freq[num]++
	}

	var pairCount int64 = 0

	// 4. Iterate through unique numbers to find pairs
	// We iterate over the keys of the map to ensure we only process each pair of values (x, y) once.
	for x, countX := range freq {
		y := target - x

		// Check if the complement y exists in the set
		if countY, found := freq[y]; found {
			if x < y {
				// Case 1: x != y. We count all combinations of x and y.
				// Since we iterate over x, we only count when x is the smaller value.
				pairCount += countX * countY
			} else if x == y {
				// Case 2: x == y (i.e., 2x = target). We need combinations of elements at the same value.
				// The number of pairs is N * (N - 1) / 2.
				if countX >= 2 {
					pairCount += countX * (countX - 1) / 2
				}
			}
		}
	}

	// 5. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
