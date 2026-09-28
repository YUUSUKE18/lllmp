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
		// No input
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// Handle case where the first line is invalid
		return
	}

	// 2. Read the sequence of numbers
	// We use a map to store frequencies of numbers encountered.
	freq := make(map[int64]int64)
	
	// Read subsequent lines and parse integers
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not valid integers
		}
		
		// Store the frequency of each number
		freq[num]++
	}

	// 3. Calculate the number of pairs
	var pairCount int64 = 0

	// Iterate over the unique numbers found in the input
	for num, count := range freq {
		complement := target - num

		// Case 1: num == complement (Self-pairs, e.g., 4 + 4 = 8)
		if num == complement {
			// We need to choose 2 distinct indices from 'count' occurrences.
			// Formula: count * (count - 1) / 2
			if count >= 2 {
				pairs := count * (count - 1) / 2
				pairCount += pairs
			}
		} else if num < complement {
			// Case 2: num != complement (Distinct pairs, e.g., 2 + 6 = 8)
			// Check if the complement exists in the map
			if complementCount, ok := freq[complement]; ok {
				// The number of pairs is the product of their frequencies.
				pairs := count * complementCount
				pairCount += pairs
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
