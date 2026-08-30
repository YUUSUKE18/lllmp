package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var count int64 = 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, but logic below handles it. Actually, simpler: use the first valid number as initial max/min or track separately.

	// Read all input at once into a string
	input, err := reader.ReadString('\n')
	if err != nil {
		os.Exit(1)
	}

	// Split by comma and whitespace handling is done via TrimSpace during parsing loop effectively if we split carefully.
	// The spec says "comma-separated", but also mentions ignoring leading/trailing spaces around elements implicitly or explicitly? 
	// "空要素・前後の空白は無視し" -> Ignore empty elements (consecutive commas) and surrounding whitespace of the whole input/elements.
	
	parts := []string{}
	currentPart := ""
	for _, ch := range input {
		if ch == ',' || ch == ' ' || ch == '\t' || ch == '\n' {
			if currentPart != "" { // Ignore empty elements resulting from consecutive separators or leading/trailing spaces if we trim later? 
				parts = append(parts, currentPart)
				currentPart = ""
			} else {
				// If it's a separator and the previous part was just whitespace/empty string logic needs care.
				// Actually simpler: split by comma first then clean up each token.
			}
		} else {
			if currentPart == "" || ch != ' ' && ch != '\t' && ch != '\n' { // Only accumulate non-whitespace chars? 
				currentPart += string(ch)
			}
		}
	}
	if currentPart != "" {
		parts = append(parts, currentPart)
	}

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue // Ignore empty elements (e.g. from "1,,2")
		}
		
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		if count == 1 || val > maxVal {
			maxVal = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
