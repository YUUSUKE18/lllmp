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
	var currentMax int64 = 0 // Will be set on first valid read

	// Read all lines from stdin until EOF
	for {
		line, err := reader.ReadString('\n')
		if err != nil && err == bufio.ErrUnexpectedEOF {
			break
		}
		if err != nil {
			continue // Handle other errors gracefully if any (though unlikely with standard input)
		}

		// Split line by comma and whitespace handling is implicit in strconv.ParseInt which ignores surrounding spaces? No, ParseInt takes string. We need to split first.
		parts := []string{}
		for _, part := range line {
			if part == ',' || (part >= '0' && part <= '9') { // This logic is flawed for splitting mixed content. Let's use a proper tokenizer approach or simple regex-like manual parsing since we can't import regexp easily without bloating, but standard library only allows fmt/os/strconv/etc usually? The prompt says "standard libraries". I will implement a simple split by comma and trim spaces manually to be safe and dependency-free within the allowed scope.
			}
		}

		// Correct splitting logic: replace commas with newlines or just iterate chars
		var tokens []string
		currentToken := ""
		for _, char := range line {
			if char == ',' || (char >= '0' && char <= '9') { // Wait, this is still messy. Let's do a proper split by comma first.
				continue 
			} else if char != '\n' && char != ' ' && char != '\t' {
				currentToken += string(char)
			}
		}

		// Re-doing the tokenization properly:
		tokens = []string{}
		var currentStr string
		for _, r := range line {
			if (r >= '0' && r <= '9') || r == '-' || r == '+' { // Allow negative numbers and signs? Prompt says "integer". Usually includes negatives. But prompt example implies positive or general integers. Let's assume standard integer format including sign if present, but the input description just says "comma-separated integers".
				if currentStr != "" && (r < '0' || r > '9') { // If we see a non-digit/non-sign char while building? No, simpler: split by comma first.
					// Actually, let's restart tokenization logic cleanly inside the loop below to avoid confusion in this thought block.
				} else if currentStr == "" && (r >= '0' || r <= '-') { // Start of number
					currentStr = string(r)
				} else {
					currentStr += string(r)
				}
			} else if r != ',' && r != '\n' && r != ' ' && r != '\t' {
				// Ignore other characters? Prompt says "ignore elements that cannot be interpreted as integers". So we can skip non-numeric chars entirely.
				continue 
			}

			if currentStr == "" || (r >= '0' && r <= '9') || r == '-' || r == '+' { // This is getting complicated to write inline without a helper function. Let's use the standard approach: split by comma, then parse each part trimming whitespace.
				continue 
			}
		}

		// Final clean tokenization logic for clarity in code generation:
		tokens = []string{}
		var sb strings.Builder // Wait, can't import strings if not allowed? "Standard libraries". Yes, `strings` is standard. But to be ultra safe and minimal, I'll do it manually or just use bufio.Scanner which splits by whitespace but we need comma separation. 
		// Okay, let's stick to the simplest: Read line -> Replace commas with spaces (or newlines) -> Split by space? No, `strconv.ParseInt` handles `-123`.
		
		// Let's implement a simple manual split function inline or just use strings.Split if allowed. "Standard libraries" includes `strings`, `bufio`, `fmt`, `os`, `math/big` (maybe not needed). 
		// I will assume standard imports like `strconv`, `fmt`, `os`, `bufio`.
		
		tokens = []string{} // Reset for the actual code block below.

		for _, part := range tokens {
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue 
			}
			
			count++
			if !hasInput || val > currentMax {
				currentMax = val
				hasInput = true
			}
		}

		fmt.Printf("count=%d max=%d\n", count, currentMax) // Wait, the loop above was inside a for-each of tokens which I haven't defined yet. 
		break 
	}
	
	// Correct Logic Implementation:
	reader = bufio.NewReader(os.Stdin)
	count := 0
	maxVal := int64(-1<<63 - 2) // Smallest possible value? No, let's use a flag.
	hasSeenAny := false

	for {
		line, err := reader.ReadString('\n')
		if err != nil && err == bufio.ErrUnexpectedEOF {
			break 
		}
		
		tokens := strings.Split(line, ",") // Using `strings` package is standard and allowed.
		
		for _, token := range tokens {
			token = strings.TrimSpace(token)
			val, err := strconv.ParseInt(token, 10, 64)
			if err != nil || val == "" { 
				continue 
			}
			
			count++
			if !hasSeenAny || val > maxVal {
				maxVal = val
				hasSeenAny = true
			}
		}
		
		fmt.Printf("count=%d max=%d\n", count, hasSeenAny ? int64(maxVal) : 0) // Wait, if no input seen? The spec says "find elements and maximum". If empty list, what is the output? 
		// Spec: "Find their 'element count' and 'maximum value'".
		// If empty input -> count=0. Max? Usually undefined or 0? Or maybe just print nothing for max if no data?
		// But format requires `max=<value>`. Let's assume valid non-empty integer list based on "comma-separated integers" implying existence, but robust code handles empty by printing something sensible like max=0 or handling the flag. 
		// If hasSeenAny is false, we can't determine a meaningful maximum from an empty set in math terms without convention. However, given the constraints and typical CP problems, if input is empty, count=0, max might be 0 or omitted? The format says `max=<value>`. I will output 0 for max if no elements found to satisfy the format string strictly.
	}

	fmt.Printf("count=%d max=%d\n", count, hasSeenAny ? int64(maxVal) : 0) // Wait, this logic is duplicated in my thought process. Let's write it cleanly now.
	
	// Re-evaluating: The previous loop structure was wrong because I mixed the reading and printing inside a broken loop condition. 
	// Correct flow: Read all lines -> Process tokens -> Print once at end? Or print per line? "Output 1 line". So accumulate count/max then print once.
	
	count = 0
	maxVal := int64(-2<<63) // Initialize to min possible + something safe, or use a flag. 
	hasInput := false
	
	// Re-read logic properly:
	reader.Reset() // Can't reset bufio.Reader easily without new instance? Just create new one.
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil && err == bufio.ErrUnexpectedEOF {
			break 
		}
		
		tokens := strings.Split(line, ",")
		for _, token := range tokens {
			token = strings.TrimSpace(token)
			val, err := strconv.ParseInt(token, 10, 64)
			if err != nil || val == "" { // Handle empty string after trim? ParseInt returns error for " ". 
				continue 
			}
			
			count++
			if !hasInput || val > maxVal {
				maxVal = val
				hasInput = true
			}
		}
		
		// Wait, I need to print ONLY ONE line at the end. So accumulate in variables and print after loop.
	}

	fmt.Printf("count=%d max=%d\n", count, hasInput ? int64(maxVal) : 0) // If no input, max=0? Or maybe just leave it as initialized min value if I didn't use flag? 
	// Let's assume valid inputs exist or output 0 for empty.
}
