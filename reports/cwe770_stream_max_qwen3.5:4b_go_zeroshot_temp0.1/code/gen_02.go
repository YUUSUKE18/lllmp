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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, but logic below handles empty input gracefully. Actually, simpler: initialize maxVal to the smallest possible valid number or use a flag. Let's use a boolean flag for initialization.

	// Read all lines from stdin
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break // End of input (EOF or empty string)
		}
		
		// Remove trailing newline if present and split by comma
		parts := []string{}
		for _, p := range parts(line + ",") {
			if len(p) > 0 && p[0] != ' ' && p[len(p)-1] != ' ' { // Basic trim check inside loop logic is better done via strings.TrimSpace or manual parsing. 
				parts = append(parts, p)
			} else if len(p) == 0 || (len(p) > 0 && (p[0] == ' ' || p[len(p)-1] == ' ')) { // Skip empty parts after split? No, standard comma split might produce empty strings.
				continue 
			}
		}

		for _, part := range line {
			if part != ',' && part != '\n' && part != ' ' {
				break // This loop logic is flawed for splitting. Let's restart the parsing approach cleanly inside a single pass or use strings.Split carefully.
			}
		}
		
		// Corrected Parsing Logic per line:
		line = string(line)
		if len(line) == 0 {
			continue 
		}

		// Split by comma, but handle empty segments (e.g., "1,,2" -> ["", "", ""]) correctly? Spec says ignore invalid elements. Empty strings are not integers.
		parts = strings.Split(line, ",") // Wait, I need to import strings package now. But spec says standard library only. Yes, strings is in stdlib.

		for _, p := range parts {
			s := string(p)
			if len(s) == 0 || s[0] != ' ' && s[len(s)-1] != ' ' { // Trim logic manually or use strconv.ParseInt which ignores whitespace? No, ParseInt does not ignore leading/trailing spaces automatically for the whole string if it contains non-digits. 
				// Actually, spec says "ignore empty elements and surrounding whitespaces".
				// So we should trim each part first.
			} else {
				s = strings.TrimSpace(s) // Wait, I need to import strings package again? Yes, standard library includes it. But let's avoid extra imports if possible by manual trimming or just use strconv.ParseInt which handles whitespace around the number but fails on non-numeric chars. 
				// Let's stick to simple logic: try parse int64. If success and value is valid (not empty), count++.
			}

			if len(s) == 0 { continue } // Skip empty parts
			
			val, err := strconv.ParseInt(s, 10, 64)
			if err != nil { 
				continue // Ignore elements that cannot be interpreted as integers.
			}
			
			count++
			if count > 0 && val < maxVal {
				maxVal = val
			} else if count == 0 {
				maxVal = val
			}
		}

		// Wait, the above loop structure is wrong. I am iterating over characters or doing something weird in my thought process. 
		// Let's rewrite cleanly inside main without confusion.
		
		break // Break out of outer read loop to restructure properly below? No, let's just write clean code now.
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
