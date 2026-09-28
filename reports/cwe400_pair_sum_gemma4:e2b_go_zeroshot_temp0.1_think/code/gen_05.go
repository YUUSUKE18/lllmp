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

	// 1. Read the target value
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

	// Map to store the frequency of each number
	counts := make(map[int64]int64)

	// 2. Read subsequent numbers and populate the frequency map
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

	// Iterate over the unique numbers found
	for num, count := range counts {
		complement := target - num

		// Check if the complement exists in the map
		if complement >= num {
			if complement == num {
				// Case 1: num + num = target (e.g., 5 + 5 = 10)
				// We need to choose 2 elements from 'count' occurrences: count * (count - 1) / 2
				if count >= 2 {
					pairs := count * (count - 1) / 2
					pairCount += pairs
				}
			} else if complement > num {
				// Case 2: num + complement = target (e.g., 3 + 7 = 10)
				// We only count pairs where num < complement to avoid double counting (e.g., counting (3, 7) and (7, 3))
				if c, ok := counts[complement]; ok {
					// Since we iterate over all keys, we only count if the complement exists.
					// We must ensure we only count the pair (num, complement) once.
					// Since we enforce num < complement, this condition handles it.
					pairCount += count * c
				}
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
