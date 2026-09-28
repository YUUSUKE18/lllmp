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

	// Map to store the frequency of each number encountered
	counts := make(map[int64]int64)
	
	// Read the remaining numbers
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not valid integers
		}

		// Update frequency count
		counts[num]++
	}

	var totalPairs int64 = 0

	// 2. Calculate the number of pairs
	// Iterate through the unique numbers (keys) in the map
	for num, count := range counts {
		complement := target - num

		// Check if the complement exists in the map
		if complement < num {
			// Case 1: num < complement. We count pairs (num, complement)
			if c, ok := counts[complement]; ok {
				// Number of pairs is count[num] * count[complement]
				totalPairs += count * c
			}
		} else if complement == num {
			// Case 2: num == complement (i.e., 2 * num = target).
			// We need to choose 2 distinct elements from 'count' occurrences.
			// The number of pairs is count * (count - 1) / 2.
			if count >= 2 {
				totalPairs += count * (count - 1) / 2
			}
		}
	}

	// 3. Output the result
	fmt.Printf("pairs=%d\n", totalPairs)
}
