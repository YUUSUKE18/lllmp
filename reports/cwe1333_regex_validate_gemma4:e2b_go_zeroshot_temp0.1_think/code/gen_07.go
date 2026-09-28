package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"unicode"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		
		// 1. Trim leading/trailing whitespace
		trimmedLine := strings.TrimSpace(line)

		// 2. Check for emptiness
		if trimmedLine == "" {
			continue // Empty lines are invalid
		}

		// 3. Validate content: must only contain digits and commas
		isValid := true
		for _, char := range trimmedLine {
			if !unicode.IsDigit(char) && char != ',' {
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// Handle potential reading errors, though unlikely for standard input
		// We proceed with the count found so far.
	}

	// Output the result in the required format
	fmt.Printf("valid=%d\n", validCount)
}
