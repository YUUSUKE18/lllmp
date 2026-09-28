package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var validLines []string

	// Read all input lines
	for {
		if !readLine(&validLines) {
			break
		}
	}

	// Process each line
	for _, line := range validLines {
		// Trim whitespace
		line = strings.TrimSpace(line)

		// Skip empty lines or lines with non-digit and non-comma characters
		if strings.IsEmpty(line) {
			continue
		}

		// Check if line is a comma-separated list of integers
		parts := strings.Split(line, ",")
		if len(parts) < 2 {
			continue
		}

		isValid := true
		for _, part := range parts {
			// Check if part is a valid integer
			if !strconv.IsInt32(part) {
				isValid = false
				break
			}
		}

		if isValid {
			// Ensure the line has at least one comma (i.e., more than one number)
			if strings.Count(strings.TrimSpace(line), ",") >= 1 {
				validLines = append(validLines, line)
			}
		}
	}

	// Output valid lines in the required format
	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
		for _, line := range validLines {
			fmt.Println(line)
		}
	} else {
		// If no valid lines, output 'valid=0' as per the specification
		fmt.Printf("valid=0\n")
	}
}
