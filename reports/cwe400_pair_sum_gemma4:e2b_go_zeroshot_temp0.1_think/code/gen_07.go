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

	// 1. Read the target value (Line 1)
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
	// Key: number, Value: frequency
	counts := make(map[int64]int64)
	var pairCount int64 = 0

	// 2. Read subsequent numbers (Lines 2 onwards)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not valid integers
		}

		// For the current number 'num', check how many times its complement (target - num)
		// has appeared previously.
		complement := target - num

		if count, found := counts[complement]; found {
			// If the complement exists, add its frequency to the total pair count.
			pairCount += count
		}

		// Update the frequency map for the current number
		counts[num]++
	}

	// 3. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
