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

	// Frequency map to store counts of numbers encountered so far
	counts := make(map[int64]int64)
	var pairCount int64 = 0

	// 2. Process subsequent lines (the numbers)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not valid integers
		}

		// Check if the required complement exists in the map
		complement := target - num

		if count, found := counts[complement]; found {
			// If the complement exists, add its frequency to the total pair count.
			// This ensures we count pairs (A_j, A_i) where j < i.
			pairCount += count
		}

		// Update the frequency count for the current number
		counts[num]++
	}

	// 3. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
