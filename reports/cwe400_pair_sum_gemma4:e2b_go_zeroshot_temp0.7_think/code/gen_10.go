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
	var target int64
	var numbers []int64

	// 1. Read the target value (Line 1)
	if !scanner.Scan() {
		// Handle empty input case if necessary
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	if targetStr == "" {
		return
	}
	
	var err error
	target, err = strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// Handle error if target is not a valid integer
		return
	}

	// 2. Read the sequence of numbers (Line 2 onwards)
	for scanner.Scan() {
		line := scanner.Text()
		// Split the line by whitespace and attempt to parse integers
		fields := strings.Fields(line)
		for _, field := range fields {
			num, err := strconv.ParseInt(field, 10, 64)
			if err == nil {
				numbers = append(numbers, num)
			}
		}
	}

	// 3. Calculate pair count using a frequency map
	counts := make(map[int64]int64)
	for _, num := range numbers {
		counts[num]++
	}

	var pairCount int64 = 0

	// Iterate over the unique numbers found in the input
	// We iterate over the keys of the map to avoid redundant checks
	for numA, countA := range counts {
		numB := target - numA

		// Check if the complement numB exists in the map
		if countB, found := counts[numB]; found {
			if numA < numB {
				// Case 1: A and B are distinct (A != B)
				// We count the pairs formed by choosing one A and one B.
				pairCount += countA * countB
			} else if numA == numB {
				// Case 2: A and B are the same (A = B = T/2)
				// We count pairs formed by choosing 2 elements from countA elements.
				// This is combinations: countA C 2 = countA * (countA - 1) / 2
				pairCount += countA * (countA - 1) / 2
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
