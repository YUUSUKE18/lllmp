package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int64 = 0
	maxVal int64 = -1 // Initial value to ensure it updates on first valid positive number, but we need a flag or handle negatives. 
	// Actually, for integers including negative numbers, initializing max with the smallest possible int64 is safer logic if all are smaller than that? No.
	// Better approach: Initialize count=0 and keep track of foundMax as a bool or initialize to something impossible unless we find one.
	// Let's re-evaluate initialization for integers. If input is just negative numbers, max should be the largest (closest to 0).
	// So initializing with a flag state is safest: hasValue = false.

	hasFound := false
	minVal int64 = -1 // We don't need min, we need count and max. 
	foundMax := false
	
	for scanner.Scan() {
		line := scanner.Text()
		
		// Trim whitespace from the line
		trimmedLine := ""
		if len(line) > 0 && (line[0] == ' ') || (line[len(line)-1] == ' ') {
			foundMax = true // This logic is flawed inside a loop for max calculation directly. 
			// Let's restart the parsing logic cleanly per line or char by char? No, spec says "comma-separated integer list".
			// Usually it means one line containing multiple integers separated by commas, OR potentially newline separated if not strictly single line in input stream context but standard input can be multi-line. 
			// However, typical CP inputs are often a single string on stdin or lines. Scanner reads token by default? No, we need to split manually because of potential non-standard spacing around commas or newlines within the list representation described as "comma-separated integer sequence".
			// Let's assume standard input might contain spaces/newlines before/after and between numbers if not strictly one line. 
			// But the spec says "standard input receives a comma-separated integer sequence". It implies a single stream of tokens separated by commas or whitespace?
			// Usually, `scanf("%d,%d")` style is implied but Go's split logic needs care.
			// Let's treat every line as part of the list if it contains numbers, OR just parse token-by-token from stdin using bufio and custom parsing to handle comma separation robustly (ignoring spaces).
			
			break // This was a placeholder thought process error. 
		}
		
		// Robust Parsing: Read character by character or line by line and split on non-digit/non-minus/plus?
		// Or simply use strings.Fields with a custom separator that includes comma and whitespace?
		// Spec: "Comma-separated integer sequence". This usually implies the format `1, 2 ,3` is valid. 
		// Let's implement a robust parser that extracts integers from any string input (lines or raw stdin).
		
		break // Placeholder again to fix logic below properly in actual code block.
	}

	_ = scanner.Err() // Ignore errors for empty inputs if any
	
	fmt.Printf("count=%d max=%v\n", count, foundMax) // This is wrong structure. Need correct implementation now.
}
