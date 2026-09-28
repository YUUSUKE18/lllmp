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

	// 1. Read target value
	if !scanner.Scan() {
		// Handle empty input
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// If the target is invalid, we stop.
		return
	}

	// 2. Read the sequence of numbers
	// We use the O(N) algorithm: iterate through the sequence, maintain a frequency map of previously seen elements, and count matches.
	
	// Map to store the frequency of numbers seen so far
	counts := make(map[int64]int64)
	var pairCount int64 = 0

	// Read subsequent lines
	for scanner.Scan() {
		line := scanner.Text()
		line = strings.TrimSpace(line)

		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore non-integer lines
		}

		// Check for pairs with previously seen numbers
		complement := target - num
		if count, found := counts[complement]; found {
			pairCount += count
		}

		// Update the frequency map for the current number
		counts[num]++
	}

	// 3. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
