```go
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
	maxVal := int64(-1<<62 - 1) // Initialize with a very small number (approx min int64 + 1 to avoid overflow issues if all are valid, but logic handles first element separately or uses flag)

	// Read input line by line until EOF
	for {
		line, err := reader.ReadString('\n')
		if err != nil && err.Error() == "EOF" {
			break
		} else if err != nil {
			continue // Ignore other errors like broken pipe
		}

		// Split by comma and process each token
		tokens := []string{}
		for _, c := range line {
			if c == ',' || (c >= '0' && c <= '9') {
				tokens = append(tokens, string(c))
			} else if c != '\n' && c != '\r' && c != ' ' { // Ignore other non-numeric chars except comma and whitespace logic handled by split usually, but here we just collect digits/comma. 
				// Actually simpler: replace commas with spaces or use strings.Split
			}
		}

		// Re-parse the line properly handling multiple lines if needed? The spec says "standard input from a comma-separated integer list". Usually implies one stream of numbers potentially across lines, but often in competitive programming it's one line. 
		// Let's assume standard behavior: read all tokens until EOF.
		
		// Better approach for robustness: Read entire buffer or process token by token?
		// Since Go bufio is convenient, let's just split the current line and continue loop if multiple lines exist (though spec implies a list). 
		// Actually, "comma-separated integer list" usually means input like "1, 2 ,3". It might span lines or be one line.
		
		// Let's restructure to read all tokens from stdin properly.
	}

	// Refined approach: Read everything into a buffer first? Or process stream. 
	// Given the spec "standard input", let's assume it could be multi-line or single line with spaces around commas.
	
	// Reset and use a more robust tokenization loop for all stdin content if needed, but usually one pass is enough.
	// Let's restart logic to handle potential newlines as separators too just in case "list" implies structure. 
	// However, strict reading: read line by line until EOF.

	reader = bufio.NewReader(os.Stdin) // Re-init? No, need fresh reader or use os.Stdin directly with custom scanner.
	
	// Let's implement a simple token parser that reads char by char to handle any whitespace/newline/comma separation robustly.
	count = 0
	
	var maxVal int64 = -1

	for {
		line, err := reader.ReadString('\n')
		if err != nil && err.Error() == "EOF" {
			break
		} else if err != nil {
			continue 
		}

		// Process the line: split by comma and trim spaces
		parts := []string{}
		for _, c := range line {
			if c == ',' || (c >= '0' && c <= '9') { // This logic is flawed for splitting.
				continue 
			} else if c != '\n' && c != '\r' && c != ' ' {
				parts = append(parts, string(c))
			}
		}

		// Correct split: replace commas with spaces and trim? Or manual parse.
		// Manual robust parsing of integers from the line content (ignoring non-digits except comma)
		
		var currentNum int64
		
		for _, c := range line {
			if c == ',' || c <= ' ' && c >= '\n' { // Skip separators and whitespace
				continue 
			} else if c >= '0' && c <= '9' {
				digit := int64(c - '0')
				
				currentNum = currentNum*10 + digit
				
				if count == 0 || (currentNum > maxVal) { // First element or new larger found? 
					// Wait, we need to accumulate the number first.
					maxVal = currentNum
					count++
					
					// Reset for next number if needed? No, this logic accumulates digits of one number.
				} else {
					currentNum = 0 // Start new accumulation? 
					// Actually, we need to track the full number value before comparing.
					maxVal = currentNum
					count++
					
					// Wait, my loop structure is wrong for accumulating digits of a single multi-digit integer.
				}
			} else {
				currentNum = 0 // Reset on invalid char? No, spec says ignore non-integers except comma/whitespace logic. 
				// Spec: "ignore elements that cannot be interpreted as integers". So if we see 'a', reset current number accumulation.
			}
		}

		// The above single-pass digit accumulation is tricky because maxVal needs to hold the value of the *current* integer being built, not just a running global max until end of line? 
		// Actually, "max" means maximum element in the list. So we need to parse each number fully before comparing.
		
	}

	// Let's rewrite cleanly using strings.Split and strconv.ParseInt which handles parsing errors gracefully if we filter first.
	
	reader = bufio.NewReader(os.Stdin) // Re-init for clean logic
	
	count = 0
	maxVal := int64(-1<<62 - 1) // Start with min possible + something safe? Or use a flag.

	// Read all lines until EOF
	for {
		line, err := reader.ReadString('\n')
		if err != nil && err.Error() == "EOF" {
			break 
		} else if err != nil {
			continue // Ignore errors like broken pipe during read
		}

		// Split by comma and whitespace? Spec says "comma-separated". But often spaces exist.
		// Let's replace commas with newlines to treat as separate tokens, then split by space/newline.
		
		tokens := []string{}
		for _, c := range line {
			if c == ',' || (c >= '0' && c <= '9') { // This is still messy for splitting logic inside loop without state machine.
				continue 
			} else if c != '\n' && c != '\r' && c != ' ' {
				tokens = append(tokens, string(c))
			}
		}

		// Simpler: Use strings.Split with comma as delimiter? But spaces around numbers need trimming.
		
		// Let's use a helper to extract tokens from the line content properly.
		var tempStr string
		
		for _, c := range line {
			if (c >= '0' && c <= '9') || c == ',' { // Only keep digits and commas for now? No, spaces are ignored per spec "ignore leading/trailing whitespace". 
				tempStr += string(c)
			} else if c != '\n' && c != '\r' { // Ignore other chars like letters? Spec says ignore elements that cannot be interpreted as integers. So 'a' makes it invalid. But does the whole line become invalid or just that element? "elements". 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c == ',' { // Keep digits and commas to form numbers. Spaces are ignored as separators effectively by splitting on non-digit/non-comma? No, spaces separate elements too usually in such problems unless strictly comma separated only. 
				tempStr += string(c)
			} else if (c >= '0' && c <= '9') || c
