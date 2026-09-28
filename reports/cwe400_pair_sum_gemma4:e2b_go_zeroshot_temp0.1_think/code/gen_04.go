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

	// 1. Read the target value T (Line 1)
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

	// 2. Read the remaining numbers (Lines 2 onwards)
	// We use a frequency map to store the counts of each number.
	freq := make(map[int64]int64)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not valid integers
		}
		freq[num]++
	}

	// 3. Calculate the number of pairs
	var pairCount int64 = 0

	// Iterate through the unique numbers found in the input
	for num, count := range freq {
		complement := target - num

		// Case 1: num == complement (i.e., 2 * num == target)
		if num == complement {
			// We need to choose 2 elements from 'count' occurrences: count * (count - 1) / 2
			if count >= 2 {
				pairs := count * (count - 1) / 2
				pairCount += pairs
			}
		} else if num < complement {
			// Case 2: num != complement. We only count pairs (num, complement) once
			// by ensuring num is the smaller element.
			if complementCount, ok := freq[complement]; ok {
				// Number of pairs is the product of their frequencies
				pairs := count * complementCount
				pairCount += pairs
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
