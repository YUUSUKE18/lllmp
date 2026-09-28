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
			continue // Empty line is invalid, skip counting
		}
		if isValid(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}

func isValid(s string) bool {
	// Check if all characters are digits or comma
	for _, r := range s {
		if !isDigit(r) && r != ',' {
			return false
		}
	}
	// Split by comma
	parts := strings.Split(s, ",")
	// Check structure: no empty parts except possibly the last one
	for i, part := range parts {
		if len(part) == 0 {
			if i < len(parts)-1 {
				return false // Empty sequence in middle not allowed
			}
			// Last part can be empty (trailing comma)
			continue
		}
		// If part is not empty, it must be digits. 
		// Global check ensures only digits and commas exist.
		// So non-empty part implies all digits.
	}
	return true
}

func isDigit(r rune) bool {
	return r >= '0' && r <= '9'
}
