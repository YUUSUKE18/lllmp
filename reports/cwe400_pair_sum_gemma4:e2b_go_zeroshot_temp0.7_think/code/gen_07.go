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
		fmt.Println("pairs=0")
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// If the first line is invalid, we stop.
		return
	}

	// 2. Read the sequence of numbers A
	// We use a map to store frequencies of the numbers encountered.
	counts := make(map[int64]int64)
	
	// Read subsequent lines
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that are not integers
		}
		
		// Store the frequency of the number
		counts[num]++
	}

	// 3. Calculate the number of pairs
	var pairCount int64 = 0

	// Iterate through the unique numbers found in the input
	for x, countX := range counts {
		y := target - x

		if x < y {
			// Case 1: x and y are distinct. We only process (x, y) once to avoid double counting.
			if countY, ok := counts[y]; ok {
				pairCount += countX * countY
			}
		} else if x == y {
			// Case 2: x and y are the same (x + x = target). We need to choose 2 elements from countX occurrences.
			if countX >= 2 {
				// Number of pairs = countX * (countX - 1) / 2
				pairCount += countX * (countX - 1) / 2
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
