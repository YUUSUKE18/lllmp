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
			continue
		}

		// Check if all characters are digits or commas
		validChars := true
		for _, r := range line {
			if !((r >= '0' && r <= '9') || r == ',') {
				validChars = false
				break
			}
		}
		if !validChars {
			continue
		}

		// Split by comma and check for empty parts (except possibly the last one)
		parts := strings.Split(line, ",")
		for i := 0; i < len(parts)-1; i++ {
			if parts[i] == "" {
				validChars = false
				break
			}
		}

		if validChars {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
