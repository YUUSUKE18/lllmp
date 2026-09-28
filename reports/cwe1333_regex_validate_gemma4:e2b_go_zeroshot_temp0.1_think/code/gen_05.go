package main

import (
	"bufio"
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

		// 3. Check if the line contains only digits and commas
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

	// Output the result in the required format
	println("valid=", validCount)
}
