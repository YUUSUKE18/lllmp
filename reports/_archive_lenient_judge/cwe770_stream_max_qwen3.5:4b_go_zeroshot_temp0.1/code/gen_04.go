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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, but logic below handles empty input gracefully. Actually, let's use the smallest possible valid number or track if we found any.

	// Read all lines from stdin
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break // End of stream
		}
		
		// Process each line (handling potential multi-line input as per "comma-separated" usually implying a single sequence or multiple sequences)
		// The spec says "integer list separated by commas". It could be one long string with newlines, or lines. 
		// We'll treat the entire stdin content as the source of numbers to be safe against whitespace/newline variations.
		
		for _, char := range line {
			if char == '\n' || char == ' ' || char == '\t' {
				continue // Skip newlines and spaces within lines if we are iterating chars, but better to split by comma first per spec "comma-separated"
			}
			
			// Actually, let's re-read: "Standard input receives a list of integers separated by commas". 
			// It doesn't explicitly forbid newlines breaking the sequence, so treating it as a stream of tokens is safest.
			continue // Handled below via tokenization logic on lines or just reading all text and splitting?
			// Let's stick to line-by-line processing but split each line by comma first, then parse integers.
		}
		
		// Re-approach: Read the whole input as a string is often easier for "list" problems unless it's interactive stream. 
		// However, bufio.ReadString('\n') loop handles large inputs better than reading all at once into memory if not needed.
		// Let's refine the logic inside this loop to parse integers from 'line'.
		
		if line == "" {
			continue // Skip empty lines immediately
		}

		parts := []string{}
		currentPart := ""
		for _, c := range line {
			if c == ',' || (c == '\n' && len(parts) > 0) { 
				// If we hit a comma, it's definitely a separator.
				// Newline handling: if the previous part was empty or just whitespace? No, let's split by non-digit chars essentially.
			}
			
			if c == ',' || (c == '\n' && currentPart != "") { // Simple heuristic for comma separation and line breaks acting as separators too usually in such specs unless strictly one line. 
				parts = append(parts, currentPart)
				currentPart = ""
			} else if c >= '0' && c <= '9' || c == '-' {
				if len(currentPart) > 128 { // Safety check for buffer overflow on string slice? No need in Go. Just accumulate.
					continue 
				}
				currentPart += string(c)
			} else if currentPart != "" && (c < '0' || c > '9') && c != '-' {
				// Non-numeric char that isn't comma or newline? Ignore it as per "interpretation error elements are ignored". 
				// But wait, the spec says "comma-separated integers". So anything else is noise.
			}
		}
		if currentPart != "" {
			parts = append(parts, currentPart)
		}

		for _, part := range parts {
			valStr := part // Trimmed? The loop above didn't trim spaces around numbers if they are attached to commas. 
			// Let's do a cleaner split: replace all non-numeric (except comma/newline which we handled loosely) with space, then tokenize by whitespace.
			
			// Simpler approach for robustness: Replace ',' and '\n' with ' ', trim spaces from each token? No, just parse int directly skipping invalid chars is hard without regex or manual parsing loop.
			// Let's restart the inner logic to be strictly compliant: "comma-separated integers". 
			// We can split by comma first, then try to parse each chunk as an integer (ignoring surrounding whitespace).
			
			if len(parts) == 0 { continue } // Should not happen if line was empty
			
			for _, token := range parts {
				valStr = string(token) // Token is a substring between commas or newlines. It might contain spaces? 
				// The spec says "comma-separated". Usually implies `1, 2` or `1,2`. Spaces around numbers are allowed ("ignore leading/trailing whitespace").
				
				if val == "" { continue }

				valInt64 := intVal(valStr) // Helper to parse and ignore errors/invalid chars? 
				// Actually, strconv.Atoi handles "   10" but fails on non-numeric garbage inside. 
				// Spec: "elements that cannot be interpreted as integers are ignored".
				
				if valInt64 != nil {
					count++
					if *valInt64 > maxVal || count == 1 && maxVal < int64(-9223372036854775808) { // Logic for first element initialization is tricky with -inf. 
						// Better: Initialize max to min_int64 + something? No, just use a flag or handle the very first valid number separately.
					}
				}
			}
		}
		
		// Wait, I need to restructure this cleanly without nested loops that might miss logic. 
		// Let's rewrite the parsing loop properly below in the final code block.
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Oops, int64 vs string formatting? No, printf %d works for int64 on 32-bit but Go uses %q or similar? 
	// Actually fmt.Println with variables: fmt.Sprintf is safer.
}

func parseInt(s string) (int64, bool) {
	val, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return val, false // Return zero/false on error? Or just ignore the whole token if it has garbage. 
	}
	return val, true
}

// Wait, I need to output exactly one line: count=<n> max=<m>.
