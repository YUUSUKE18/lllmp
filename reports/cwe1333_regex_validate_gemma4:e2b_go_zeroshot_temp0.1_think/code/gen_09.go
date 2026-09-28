package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
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

		// 3. Split the line by comma
		// We use strings.Split which handles multiple delimiters correctly.
		tokens := strings.Split(trimmedLine, ",")

		isValid := false
		
		// Check if there is at least one non-empty token that represents a number.
		// This handles cases like "1,2" (tokens: ["1", "2"]) or "1," (tokens: ["1", ""])
		for _, token := range tokens {
			// Trim the token just in case there are internal spaces (though the spec implies strict comma separation)
			t := strings.TrimSpace(token)
			
			if t != "" {
				// Check if the token consists only of digits (and is thus a valid integer string)
				if _, err := fmt.Sscan(t); err == nil {
					// If Sscan succeeds, the token is a valid integer representation.
					isValid = true
					break
				}
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
