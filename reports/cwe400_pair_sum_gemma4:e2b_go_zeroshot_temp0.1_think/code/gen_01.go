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
		// No input provided
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// Handle error if target is invalid (though specification implies valid input)
		return
	}

	// Map to store the frequency of numbers encountered so far
	seen := make(map[int64]int64)
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

		// For the current number 'num', check how many times its complement (target - num) has been seen.
		complement := target - num

		// If the complement exists in 'seen', it forms a pair with the current number.
		if count, found := seen[complement]; found {
			pairCount += count
		}

		// Update the frequency map for the current number
		seen[num]++
	}

	// 3. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
