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
		line := strings.TrimSpace(scanner.Text())
		if len(line) == 0 {
			continue // Empty line is invalid
		}

		hasDigit := false
		validChars := true

		for _, r := range line {
			if !isDigit(r) && r != ',' {
				validChars = false
				break
			}
			if isDigit(r) {
				hasDigit = true
			}
		}

		if !validChars || !hasDigit {
			continue // Invalid characters or no digits
		}

		// Must start with a digit to ensure the first sequence is a number
		if line[0] == ',' {
			continue
		}

		validCount++
	}

	fmt.Printf("valid=%d\n", validCount)
}

func isDigit(r rune) bool {
	return r >= '0' && r <= '9'
}
