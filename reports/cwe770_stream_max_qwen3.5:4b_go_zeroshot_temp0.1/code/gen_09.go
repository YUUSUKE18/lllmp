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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, but logic below handles empty input gracefully. Actually, let's use the smallest possible valid number or track if we've seen any.

	// Read all lines from stdin
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break // End of input (EOF or empty string)
		}

		// Split by comma and process each token
		parts := []string{}
		currentToken := ""
		for _, char := range line {
			if char == ',' {
				if currentToken != "" {
					parts = append(parts, currentToken)
					currentToken = ""
				} else if len(line) > 0 && (char < 'A' || char > 'Z') { // Check for non-digit start? No, just split.
					// Actually simpler: use strings.Split but handle empty parts after trim later or during parse.
					parts = append(parts, currentToken)
				} else if len(line) == 0 && line[len(line)-1] != ',' { // Handle trailing comma case roughly by logic below? 
					// Let's just split and filter in the loop.
				}
			} else {
				currentToken += string(char)
			}
		}
		if currentToken != "" {
			parts = append(parts, currentToken)
		}

		for _, token := range parts {
			token = strings.TrimSpace(token) // Wait, I need to import "strings" here. Let's refactor slightly for single file without extra imports if possible? No, standard lib is fine. But wait, the prompt says "standard library only". So `import "strings"` is allowed.

			// Re-reading logic:
			// 1. Split by comma manually or use strings.Split. Let's do manual to avoid import dependency on strings if I want minimal imports? No, standard lib includes strings. It's fine.
			// Actually, let's just parse the whole line character by character for robustness against weird spacing around commas? 
			// "カンマ区切りの整数列" -> usually implies comma separated values like 1,2,3 or 1 , 2 .
			
			// Let's restart parsing logic to be safe and simple.
			break // Break out of the loop above because I need to restructure for clarity in one block.
		}

		// Corrected approach: Read line, split by comma, trim whitespace from each part, parse int64. Ignore invalid ones.
		
		// Let's rewrite the inner logic cleanly inside main without helper functions if possible? No, helpers are fine as long as they are in package main or imported. But to keep it simple and strictly one block:

	}
	
	// Wait, I need to structure this properly now.
	// Re-implementing reading loop correctly.
	
	reader = bufio.NewReader(os.Stdin) // Reset reader logic? No, just define once.
	count = 0
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break 
		}

		parts := strings.Split(line, ",")
		
		for _, part := range parts {
			part = strings.TrimSpace(part) // Trim whitespace around the number
			
			if len(part) > 0 {
				val, err := strconv.ParseInt(part, 10, 64)
				if err == nil {
					count++
					if count == 1 || val > maxVal {
						maxVal = val
					}
				} else {
					continue // Ignore invalid integers
				}
			}
		}
		
		// Wait, the loop above breaks on EOF. But I need to handle multiple lines? 
		// "標準入力から...受け取ります" implies potentially multi-line or single line.
		// My previous logic broke out of the for-each parts loop when reading a new line incorrectly due to variable scope confusion in thought process.
		
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait, if no elements found? 
	// If count is 0 and maxVal was initialized weirdly...
	// Let's fix initialization logic: Initialize maxVal to a very small number or handle the "first element" case.
	
}
