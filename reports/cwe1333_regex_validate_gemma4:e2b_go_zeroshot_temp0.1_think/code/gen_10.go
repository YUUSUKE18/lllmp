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

		// 2. Check for empty line
		if trimmedLine == "" {
			continue
		}

		// 3. Validate content: Check if the line contains only digits, commas, and spaces.
		// This handles the requirement: "数字とカンマ以外を含む行は妥当ではありません。"
		isValid := true
		for _, r := range trimmedLine {
			if !unicode.IsDigit(r) && r != ',' && !unicode.IsSpace(r) {
				isValid = false
				break
			}
		}

		if isValid {
			// Further structural check: Ensure that the content, when stripped of spaces,
			// consists only of digits and commas.
			// This handles cases like "1, a" which should be invalid.
			
			// We check the original trimmed line for invalid characters.
			// If the line contains only digits, commas, and spaces, it passes the structural check.
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// Handle potential reading errors, though usually not critical for simple stdin reading
	}

	// Output the result in the required format
	fmt.Printf("valid=%d\n", validCount)
}
