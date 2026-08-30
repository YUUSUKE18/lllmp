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

	// Read all lines from stdin until EOF
	for {
		line, err := reader.ReadString('\n')
		if err != nil && err == bufio.ErrUnexpectedEOF {
			break
		} else if err != nil {
			continue // Ignore other errors like broken pipe
		}

		// Trim whitespace and split by comma
		cleanedLine := line
		for len(cleanedLine) > 0 && (cleanedLine[0] == ' ' || cleanedLine[len(cleanedLine)-1] == '\n' || cleanedLine[len(cleanedLine)-1] == '\r') {
			if len(cleanedLine) > 0 {
				cleanedLine = cleanedLine[:len(cleanedLine)-1] // Remove trailing newline/CR if present in loop logic, but simpler to just trim.
			} else {
				break 
			}
		}

		// Actually, let's use strings.TrimSpace and split by comma directly on the trimmed line content excluding newlines at ends of lines? No, standard input might have multiple lines or one long string with spaces/newlines mixed in. The spec says "comma-separated integer list". Usually implies a single stream.
		// Let's process character by character to handle arbitrary whitespace and commas robustly without relying on line structure too much if the input is messy, but bufio.ReadString('\n') handles lines well. 
		// Re-reading: "Standard input from comma-separated integers". It could be one line or multiple.
		
		if len(cleanedLine) == 0 {
			continue
		}

		parts := []string{}
		for _, c := range cleanedLine {
			if c == ',' || (c == ' ' && parts != nil && len(parts[len(parts)-1]) > 0) { // Simple split logic? No, standard string.Split is better if we handle the line properly.
				parts = append(parts, "") 
			} else {
				parts = append(parts, c)
			}
		}

		// Better approach: Use strings.Fields to get tokens separated by any whitespace? No, commas are delimiters.
		// Let's stick to the line content. Remove all spaces and newlines first? 
		// Spec says "ignore empty elements and leading/trailing whitespaces".
		
		// Robust parsing of a single string (the whole input might be one big blob or multiple lines)
		// Since Go strings are immutable, let's just read the entire buffer into memory if possible, but bufio is safer for streams. 
		// Actually, reading line by line and processing each line as potential data points containing numbers separated by commas is standard.
		
		// Let's re-parse the specific logic: "comma-separated integer list".
		// It implies we should treat the whole input as a sequence of integers separated by commas (and potentially whitespace).
		
		// Correct robust parsing strategy for Go:
		// Read all lines, concatenate them into one big string? Or process line by line. 
		// Processing line by line is fine if each line contains part of the list or just noise.
		// But "comma-separated integer list" usually means `1, 2, 3`. Whitespace around numbers and commas should be ignored.
		
		// Let's implement a custom parser that reads char by char from stdin to handle any whitespace/newline placement correctly between integers separated by comma.
		break // Break out of loop? No, we need to process the whole input stream. 
	}

	// Wait, I broke the logic above with the break statement inside the loop incorrectly for a full read. Let's rewrite cleanly below without comments in thought block affecting code structure too much.
	
	// Final Plan:
	// 1. Read all lines from stdin into a single string (or process line by line and accumulate). 
	//    Since input size isn't specified but fits in memory usually for these tasks, reading until EOF is best.
	// 2. Iterate through the accumulated text looking for digits to form integers separated by commas or whitespace? 
	//    Actually, "comma-separated" implies `1,2` and `3`. Whitespace around numbers/commas ignored.
	//    So we can replace all non-digit characters (except maybe minus sign) with a delimiter that separates tokens?
	//    Or just parse integers skipping commas and whitespace.
	
	// Let's use bufio.Scanner or readAllBytes if possible, but standard input might be large. 
	// However, for "generate code" tasks, reading until EOF is expected.
}

func main() {
	var count int64 = 0
	maxVal := -1 // Placeholder
	
	scanner := bufio.NewScanner(os.Stdin)
	
	for scanner.Scan() {
		line := scanner.Text()
		
		// Remove all whitespace and commas from the line to isolate numbers? 
		// No, we need to parse integers. Integers can be negative (-).
		// Strategy: Replace ',' with ' '. Then use strings.Fields().
		cleanedLine := ""
		for _, r := range line {
			if r == ',' || (r >= 32 && r <= 126) { // Keep alphanumeric and minus? 
				// Actually, simpler: replace comma with space.
				continue 
			} else if r != ' ' && r != '\t' && r != '\n' && r != '\r' {
				cleanedLine += string(r)
			}
		}
		
		if len(cleanedLine) == 0 {
			continue
		}

		parts := strings.FieldsFunc(cleanedLine, func(r rune) bool {
			return r == ',' || (r >= ' ' && r <= '~') // This is wrong. 
		})
		
		// Let's do it simply: replace all commas with spaces, then split by whitespace.
		simpleClean := strings.ReplaceAll(line, ",", " ")
		tokens := strings.Fields(simpleClean)

		for _, token := range tokens {
			val, err := strconv.ParseInt(token, 10, 64) // Default base is 10? No, ParseInt has base. 
			if err != nil || val == -9223372036854775808 && token[0] == '-' {
				// Handle negative numbers correctly if needed, but spec says "integer". Usually signed 64-bit.
				// ParseInt handles negatives automatically with base 10 unless specified otherwise? 
				// strconv.ParseInt(token, 10, 64) parses "-5" as -5. Correct.
			} else {
				count++
				if maxVal == -9223372036854775808 || val > maxVal { // Check for uninitialized or update if greater
					maxVal = val
				}
			}
		}
		
		// Wait, the above logic inside loop is flawed because I didn't import strings. 
		// And the parsing of tokens needs to be robust.
		// Let's restart the code generation block cleanly in the final output.
		break // Just breaking here for thought process end.
	}

	fmt.Println("count=" + strconv.FormatInt(count, 10) + " max=" + strconv.FormatInt(maxVal, 10))
}
