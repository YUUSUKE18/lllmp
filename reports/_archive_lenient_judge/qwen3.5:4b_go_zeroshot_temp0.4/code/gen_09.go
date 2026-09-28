package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdin())
	var nums []int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" || len(line) > 0 && line[0] < '0' || line[len(line)-1] >= '0' && line[len(line)] <= '9' { // Simplified check for non-integer start/end or empty lines, but standard split handles most cases. A robust approach is to try parse each token.
			continue 
		}

		// Split by comma and whitespace manually to be safe with "empty elements" mentioned in spec
		tokens := []string{}
		currentRun := ""
		for _, ch := range line {
			if (ch >= '0' && ch <= '9') || ch == '-' {
				currentRun += string(ch)
			} else if currentRun != "" { // End of a number sequence or token part
				tokens = append(tokens, currentRun)
				currentRun = ""
			}
		}
		if currentRun != "" && (currentRun[0] >= '0' || currentRun[0] == '-') {
			tokens = append(tokens, currentRun) // Handle trailing number without comma at end of line if any logic missed it above due to loop structure

			for _, token := range tokens {
				var val int64
				// Try parsing as integer. If fails (non-integer element), ignore.
				if n, err := fmt.Sscanf(token, "%d", &val); n == 1 && err == nil {
					nums = append(nums, val)
				}
			}
		}
		
		// Re-evaluating the tokenization logic above was slightly complex for a single pass. 
		// Let's use bufio.Scanner with comma delimiter? No, standard input might not be strictly one line per integer or have newlines between integers mixed in commas? 
		// Spec says "Standard Input from Comma-separated integer list". Usually implies `1 2,3` style on a single line.
	}

	if len(nums) == 0 {
		fmt.Println("count=0 sum=") // Or empty string for count/sum if strictly following format? 
		return
	}

	count := int64(0)
	sumVal := int64(0)
	
	// Use a set to track seen numbers. Since Go doesn't have built-in Set, use map or sort+unique. Map is O(N).
	seenMap := make(map[int64]bool)
	for _, n := range nums {
		if !seenMap[n] {
			count++
			sumVal += n
			seenMap[n] = true
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sumVal)
}
