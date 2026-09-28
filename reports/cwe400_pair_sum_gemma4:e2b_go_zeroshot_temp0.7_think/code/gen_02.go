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

	// 1. Read the target value T (First line)
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

	// 2. Read the remaining numbers
	counts := make(map[int64]int64)
	
	// Read subsequent lines
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			counts[num]++
		}
		// If parsing fails, we ignore the line as per specification.
	}

	// 3. Calculate the number of pairs
	var pairCount int64 = 0

	// Iterate over the unique numbers found
	for num, freq := range counts {
		complement := target - num

		// Ensure we only count each pair once (e.g., A+B and B+A are the same pair)
		if num < complement {
			if complementFreq, exists := counts[complement]; exists {
				// If num and complement are different, the number of pairs is freq(num) * freq(complement)
				pairCount += freq * complementFreq
			}
		} else if num == complement {
			// Case where 2 * num = target. We need to choose 2 distinct indices from freq[num].
			// The number of pairs is freq * (freq - 1) / 2
			if freq >= 2 {
				pairCount += freq * (freq - 1) / 2
			}
		}
	}

	// 4. Output the result
	fmt.Printf("pairs=%d\n", pairCount)
}
