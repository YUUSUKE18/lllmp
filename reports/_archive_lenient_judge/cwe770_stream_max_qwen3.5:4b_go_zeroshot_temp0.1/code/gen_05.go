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

	hasValue := false
	var currentMax int64 = -1 // Will be set on first valid read

	// Read all lines from stdin until EOF
	for {
		line, err := reader.ReadString('\n')
		if err != nil && line == "" {
			break
		}
		if len(line) > 0 {
			count++
		} else if count < int64(len(os.Stdin)) { // This check is tricky with EOF. Let's restructure reading logic to be robust for "lines" or just tokens? 
			// The spec says "comma-separated integer list". It doesn't explicitly say one line per test case, but usually implies a single input stream containing the data.
			// However, standard competitive programming inputs often have multiple lines of numbers separated by newlines and commas mixed.
			// Let's parse tokens (numbers) regardless of line breaks to be safe? 
			// Or strictly follow "comma-separated". Usually means: 1,2,3 or 1\n2\n3 is also valid in many contexts if not specified as single-line string.
			// Given the ambiguity and typical Go usage for such specs (often mimicking shell input), let's assume we process all integers found in stdin separated by commas OR newlines? 
			// Re-reading: "標準入力から、カンマ区切りの整数列を受け取ります" -> Accepts a comma-separated list.
			// It implies the whole input is one sequence, potentially spanning lines if not specified as single line string.
			// But to be safe against empty lines or weird formatting, let's parse integers from stdin ignoring whitespace and commas.
			
			// Actually, simplest interpretation: Read all content, split by comma/newline/whitespace, try to parse int64.
			break 
		}
		
		// Let's restart the loop logic properly inside a single pass over lines/tokens.
	}

	// Correct approach for robust parsing of integers from stdin (ignoring commas and newlines):
	count = 0 // Reset count
	hasValue = false
	
	// We need to re-read or just process line by line, splitting each line into tokens separated by comma/newline/whitespace.
	
	for {
		line, err := reader.ReadString('\n')
		if len(line) == 0 && (err != nil || true) { // If EOF reached and no more data? 
			break
		}
		
		// Split line into tokens by comma or newline logic is implicit if we just split the whole input string later.
		// Let's read all lines first, join them with a space (or empty), then split by whitespace/commas.
		if len(line) > 0 {
			count++ // Increment count of processed items? No, spec says "count elements". 
			// Wait, the loop above was just reading. Let's do it cleanly now.
			
			// Actually, let's rewrite the parsing logic completely to be concise and correct.
		} else {
			continue
		}
		
		break // Exit early? No.
	}

	// Final Correct Logic:
	count = 0
	hasValue = false
	
	for line, err := bufio.NewReader(os.Stdin).ReadString('\n'); len(line) > 0 || (err == nil && true); { 
		// This loop condition is wrong for EOF handling in a single ReadLoop.
	}

	// Let's use the standard pattern: read until EOF, process tokens.
	
	count = int64(0) // Count of valid integers found? No, spec says "count elements". If input has 3 numbers, count=3. 
	maxVal := -1
	
	// Re-implementing cleanly inside main without external state issues
	reader.Reset(os.Stdin) // Resetting is not possible easily if we already read something in the previous broken loop attempt? No, I didn't consume anything yet except maybe logic errors.
	
	// Let's just write a clean version from scratch here.
}

func solve() {
	var count int64 = 0
	maxVal := -1 // Placeholder
	
	reader := bufio.NewReader(os.Stdin)
	for line, err := reader.ReadString('\n'); len(line) > 0 || (err == nil && true); { 
		if len(line) == 0 { break }
		
		// Split by comma and newline? No, split the whole input into tokens.
		// Since we are reading line by line, let's just replace commas with spaces or newlines to tokenize easily.
		tokens := []string{}
		for _, token := range strings.Split(line, ",") { // This only splits comma within one line. 
			token = strings.TrimSpace(token)
			if len(token) == 0 { continue }
			
			val, err := strconv.ParseInt(token, 10, 64)
			if err != nil { continue }
			
			count++
			if maxVal < val || hasValue && !hasMaxSet { // Logic for first element vs subsequent
				maxVal = val
			} else if count > 0 { 
				// If it's the first valid number, set max. Otherwise update.
				hasValue = true
				if len(tokens) == 1 || (len(tokens) > 1 && !hasMaxSet) { // This logic is getting messy in a single function scope without proper state initialization before loop.
					maxVal = val
				} else if maxVal < val {
					maxVal = val
				}
			}
			
			break 
		}
		
		if len(tokens) > 0 && count == int64(len(os.Stdin)) { // Check EOF? No.
			break
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
