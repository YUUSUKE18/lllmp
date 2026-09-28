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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, but logic below handles empty input gracefully. Actually, simpler: initialize max to the smallest possible valid number or use a flag. Let's use a boolean flag for initialization.

	hasInput := false
	var currentMax int64 = -1 // Will be set on first valid read

	// Read all lines until EOF
	for {
		line, err := reader.ReadString('\n')
		if err != nil && err == bufio.ErrUnexpectedEOF {
			break
		}
		if line == "" || len(line) > 0 && line[0] == '\r' { // Handle empty or carriage return only lines if present (though ReadString handles newline, sometimes extra CR exists in some environments? No, standard input usually fine. Just skip empty strings.)
			continue 
		}

		parts := []string{}
		for _, p := range line {
			if p == ',' || p == ' ' || p == '\t' {
				break // Wait, this loop logic is wrong for splitting by comma and space. Let's use strings.Fields or manual parsing properly.
			} else if p >= '0' && p <= '9' || p == '-' {
				parts = append(parts, string(p))
			}
		}

		// Better approach: split the line by comma and space manually to handle mixed separators or just use strings.Split on comma then filter spaces.
		// The spec says "comma-separated", but also mentions ignoring whitespace around elements. 
		// Let's assume standard CSV-like input with optional surrounding whitespace per element.

		// Re-parse logic: Split by comma, trim each part, parse int.
		subParts := strings.Split(line, ",") // Need to import strings? Yes.
		
		for _, s := range subParts {
			s = strings.TrimSpace(s)
			if len(s) == 0 || !isDigitOrMinusOneChar(s[0]) && (len(s) > 1 && isDigitOrMinusOneChar(s[len(s)-1])) { // Check if it looks like a number? 
				// Actually, simpler: try to parse. If fails, ignore.
			}

			if len(s) == 0 || s[0] != '-' && !isNumericString(s) { continue }
			
			val, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue 
			}

			count++
			if hasInput {
				if val > currentMax {
					currentMax = val
				}
			} else {
				currentMax = val
				hasInput = true
			}
		}
		
		// Wait, the above loop logic inside main is getting messy with imports. Let's rewrite cleanly using standard library only (strings).

		break // Break to restart? No, I need a clean implementation below.
	}
	
	fmt.Printf("count=%d max=%d\n", count, currentMax) 
}

func isNumericString(s string) bool {
	if len(s) == 0 { return false }
	for _, c := range s {
		if (c >= '0' && c <= '9') || (c == '-' && len(s) > 1 && !isDigitOrMinusOneChar(c)) { // This is getting complicated. Just tryParseInt is best if I can import strconv which I did. 
			return true
		}
		if !(c >= '0' && c <= '9') || (c == '-' && len(s) > 1) { return false }
	}
	return true
}

// Wait, the previous code block had a break that exited early incorrectly if I put it there. 
// Let's write the final clean version without helper functions to avoid import issues or logic errors in this thought process simulation.
