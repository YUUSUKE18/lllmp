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
		// No input provided
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// Handle case where the first line is not a valid integer (though specification implies it will be)
		return
	}

	// Frequency map to store counts of numbers encountered so far
	// Keys are the numbers, values are their counts.
	freq := make(map[int64]int64)
	var pairCount int64 = 0

	// 2. Read subsequent numbers (Lines 2, 3, ...)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore non-integer lines
		}

		a := num
		b := target - a

		// Check if the complement b has been seen before
		if countB, found := freq[b]; found {
			// Found pairs: (b, a). We add the number of times b has appeared to the total count.
			pairCount += countB
		}

		// Update the frequency map for the current number a
		freq[a]++
	}

	// Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
