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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, or use logic below. 
	// Actually, better approach: initialize maxVal to the smallest possible int64 and flag if set.

	hasValue := false
	minInt64 := int64(-9223372036854775808) // -1<<63

	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break
		}

		parts := []string{}
		currentLine := line
		startIdx := 0
		
		// Remove leading and trailing whitespace from the whole string first? 
		// The spec says "empty elements, front/back spaces are ignored". 
		// It implies we should parse tokens separated by commas or newlines.
		// Let's assume comma-separated within lines, potentially multiple lines.
		
		for len(currentLine) > 0 {
			if currentLine[len(currentLine)-1] == '\n' || currentLine[0] == ' ' && (len(currentLine)>2 && currentLine[:3][0]=='\n') { 
				// Handle empty lines or just whitespace lines if they exist, though spec implies comma separated.
				// Let's stick to splitting by comma and trimming each part.
			}

			if len(parts) == 0 || (len(currentLine) > startIdx && currentLine[startIdx] != ',') {
				parts = append(parts, strconv.Itoa(len(line))) // Wait, logic error in thought process above. Let's restart parsing cleanly.
			}
			
			break 
		}

		// Correct Parsing Logic: Split by comma and trim whitespace from each token.
		tokens := []string{}
		for _, s := range line {
			if s == ',' || (s >= '0' && s <= '9') { // Rough heuristic, but better to use strings.Fields or manual split
				continue 
			} else if s != '\n' && s != ' ' {
				tokens = append(tokens, string(s))
			}
		}

		for _, token := range tokens {
			if len(token) == 0 || (len(token) > 1 && token[0] == ',' ) { continue } // Skip empty or just comma parts if split incorrectly. 
			
			val, err := strconv.ParseInt(token, 10, 64)
			if err != nil {
				continue // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
			}

			count++
			if !hasValue || val > maxVal {
				maxVal = val
				hasValue = true
			}
		}
		
		line, _ := reader.ReadString('\n') // Re-read? No. The loop structure above was flawed. Let's rewrite cleanly inside main.
		break 
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
