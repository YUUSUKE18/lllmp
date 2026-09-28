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
		fmt.Println("pairs=0")
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// Handle error if target is invalid, though constraints imply valid input
		return
	}

	// 2. Read the sequence of numbers and build frequency map
	counts := make(map[int64]int64)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not valid integers
		}
		counts[num]++
	}

	// 3. Calculate the number of pairs
	var pairCount int64 = 0

	// Iterate through the unique numbers found
	for x, countX := range counts {
		y := target - x

		// Check if the complement y exists in the map
		if countY, found := counts[y]; found {
			if x < y {
				// Case 1: x and y are distinct. Count all combinations.
				pairCount += countX * countY
			} else if x == y {
				// Case 2: x and y are the same (x + x = target). Count combinations of identical elements.
				// We need to choose 2 elements from countX occurrences: countX * (countX - 1) / 2
				pairCount += countX * (countX - 1) / 2
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
