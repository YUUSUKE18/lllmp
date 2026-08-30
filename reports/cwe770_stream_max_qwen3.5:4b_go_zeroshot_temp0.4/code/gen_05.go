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
	maxVal := int64(-1 << 62) // Initialize with a very small number to ensure it gets updated on first valid input. Since inputs are within signed 64-bit range, this is safe unless the only value is min_int64, which we handle next.

	// Handle potential edge case where maxVal remains at initialization if no positive numbers exist but negative ones do.
	// A robust approach: initialize with a flag or use the first valid number as initial max.
	hasInput := false
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break
		}

		parts := []string{}
		currentLineStart := true
		
		// Parse the current line manually to handle spaces and commas robustly.
		for _, char := range line {
			switch char {
			case ' ', '\n': // Skip whitespace including newlines (though ReadString consumes newline)
				continue
			case ',':
				if !currentLineStart && len(parts) > 0 {
					val, err := strconv.ParseInt(parts[len(parts)-1], 10, 64)
					if err == nil {
						count++
						if hasInput || val > maxVal {
							maxVal = val
							hasInput = true
						} else if !hasInput && count > 0 { // If first element was skipped or logic flow issue? 
											   // Actually, let's simplify the parsing loop.
					}
				}
			default:
				if currentLineStart || char == ' ' {
					currentLineStart = false
				}
				
				valStr := string(char)
				parts = append(parts, valStr) // Accumulate digits? No, simpler to split by comma first.
			}
			
			// Re-evaluating parsing strategy for simplicity and correctness:
			// 1. Split line by ',' (or just iterate chars). 
			// Let's restart the logic inside the loop more cleanly below.
		}

		// Corrected Parsing Logic per line iteration or full content?
		// The spec says "comma-separated integer list". It could be one line or multiple lines, but usually implies a single sequence.
		// However, standard input reading until EOF is safer. Let's restructure to process all tokens from stdin regardless of newlines if possible, 
		// OR strictly per the typical CP problem format (one line). The spec says "Standard Input receives comma-separated integer list".
		// It doesn't explicitly forbid multiple lines, but usually implies one sequence. 
		// Let's assume standard behavior: read all input as a stream of tokens separated by commas or whitespace? 
		// Or strictly split the whole input into chunks by non-digit/non-comma chars?
		
		// Most robust interpretation for "comma-separated list": Split the entire stdin content by ',' then parse each part.
	}

	// Refined approach: Read all remaining lines, join them with space (to treat newlines as separators too), 
	// or just process line by line splitting by comma and trimming whitespace.
	
	// Let's restart the logic cleanly for the final code block below to ensure correctness without re-parsing above loop mess.
}
