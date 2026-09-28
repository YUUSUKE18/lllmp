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
		// If the first line is invalid, exit
		return
	}

	// 2. Read the remaining numbers (Lines 2 onwards)
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

	// Iterate over the unique numbers found in the input
	for a, freqA := range freq {
		c := target - a

		// Case 1: a == c (i.e., 2a = target)
		if a == c {
			// We need to choose 2 distinct indices from freqA occurrences.
			// The number of ways is freqA * (freqA - 1) / 2
			if freqA >= 2 {
				pairCount += freqA * (freqA - 1) / 2
			}
		} else if a < c {
			// Case 2: a != c. We only count pairs (a, c) where a < c to avoid double counting.
			if freqC, ok := freq[c]; ok {
				pairCount += freqA * freqC
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
