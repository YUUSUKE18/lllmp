package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile(0) // Read all from stdin
	content := string(input)

	// Split by comma to get tokens (words)
	tokens := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	maxValue := int64(-1e18) // Initialize with a very small number for int64 safety

	for _, token := range tokens {
		// Trim whitespace from each token
		trimmedToken := strings.TrimSpace(token)
		if trimmedToken == "" {
			continue // Ignore empty elements
		}

		// Try to parse as int64
		val, err := strconv.ParseInt(trimmedToken, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		if val > maxValue {
			maxValue = val
		}
	}

	// Output the result in the specified format
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
