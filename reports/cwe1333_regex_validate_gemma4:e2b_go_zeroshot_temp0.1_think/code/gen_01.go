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
		
		// 1. Trim leading/trailing whitespace (as per requirement)
		trimmedLine := strings.TrimSpace(line)

		// 2. Check for empty line
		if trimmedLine == "" {
			continue
		}

		// 3. Validate content: Must only contain digits and commas.
		isValidFormat := true
		hasDigit := false

		for _, char := range trimmedLine {
			if unicode.IsDigit(char) {
				hasDigit = true
			} else if char != ',' {
				// Contains characters other than digits and commas
				isValidFormat = false
				break
			}
		}

		if !isValidFormat {
			continue
		}

		// 4. Validate structure: Must contain at least one number sequence.
		// If it passed the format check, it must contain at least one digit to be considered valid.
		if hasDigit {
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
