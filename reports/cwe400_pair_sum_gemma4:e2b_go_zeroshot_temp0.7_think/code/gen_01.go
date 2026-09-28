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

	// 1. Read the target value
	if !scanner.Scan() {
		// Handle empty input if necessary
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// Should not happen based on problem spec, but good practice
		return
	}

	// 2. Read the sequence of numbers and populate frequency map
	counts := make(map[int64]int64)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		// Process numbers separated by whitespace on the line
		fields := strings.Fields(line)
		for _, field := range fields {
			num, err := strconv.ParseInt(field, 10, 64)
			if err == nil {
				counts[num]++
			}
		}
	}

	// 3. Calculate the number of pairs
	var pairCount int64 = 0

	// Iterate over the unique numbers found in the input
	for x, countX := range counts {
		y := target - x

		// We only consider pairs (x, y) where x <= y to avoid double counting
		if x <= y {
			if countY, exists := counts[y]; exists {
				if x == y {
					// Case 1: x = y (2x = target). We need combinations of identical elements.
					// Number of pairs is C * (C - 1) / 2
					if countX >= 2 {
						pairs := countX * (countX - 1) / 2
						pairCount += pairs
					}
				} else {
					// Case 2: x != y. We need pairs formed by x and y.
					// We only count if x < y to ensure we process the pair {x, y} only once.
					if x < y {
						countYVal := counts[y]
						pairs := countX * countYVal
						pairCount += pairs
					}
				}
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
