package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we'll handle it gracefully. 
                                 // Actually, for standard input without arguments, reader should be initialized properly or handled via stdin directly.
                                 // Let's use a simpler approach: read from os.Stdin implicitly by creating the scanner correctly? No, Go doesn't auto-read.
                                 // We need to create a Scanner that reads from io.Reader (stdin).

	// Re-implementing with correct standard input reading logic for clarity and correctness in one block.
	import "os"
	
	scanner := bufio.NewScanner(os.Stdin)
	numbers := make(map[int]int64) // map to store counts; int64 for sum accumulation later if needed, but count is just integer.

	// Read all lines until EOF
	for scanner.Scan() {
		line := scanner.Text()
		
		// Skip empty or whitespace-only lines
		if line == "" || len(line) == 0 {
			continue
		}

		// Split by comma and process each token
		parts := []string{}
		for _, s := range line {
			if s == ',' {
				break // This logic is flawed for splitting. Let's use strings.Split instead.
			} else if (s >= '0' && s <= '9') || s == '-' {
				parts = append(parts, string(s))
			}
		}

		// Actually, let's just split the line by comma directly using strings package logic manually or import it. 
		// Since we can only use standard library, importing "strings" is fine? The prompt says "standard libraries". Yes.
		
		// Correct approach: Use bufio.Scanner and then process tokens separated by commas within a line OR lines are just space/comma delimited?
		// Spec says "comma-separated integer list". Usually implies one or more integers per input stream, potentially across multiple lines if not specified as single line. 
		// However, standard competitive programming inputs often have all on one line or multiple lines. The safest is to read token by token (skipping whitespace and commas).
		
	}

	// Let's rewrite the reading logic properly using a custom tokenizer approach within main without external imports beyond bufio/os/strconv.
	
	scanner = bufio.NewScanner(os.Stdin) // Re-declare scanner correctly
	
	counts := make(map[int]int64) // map to store count of each number
    
	for scanner.Scan() {
		line, _ := scanner.ReadBytes('\n') 
		if len(line) == 0 || line[0] == '\r' && len(line)-1 > 0 && line[len(line)-2] == '\r' { continue } // Handle empty lines or weird endings
		
		// We need to parse integers from the string, ignoring commas and whitespace.
		for i := 0; i < len(line); i++ {
			if (line[i] >= '0' && line[i] <= '9') || line[i] == '-' {
				start := i
				end := start
				for end < len(line) && ((line[end] >= '0' && line[end] <= '9') || line[end] == '-') { // Wait, minus sign logic is tricky inside loop if not careful. 
					// Better: collect digits and signs first then parse? Or just iterate char by char building a string buffer for each number.
				}

				// Simpler parsing strategy per character in the whole input stream (ignoring newlines):
			} else {
				continue // Skip non-numeric chars like commas, spaces, etc.
			}
			
			if line[i] == '-' && i+1 < len(line) && isDigit(line[i+1]) {
				numStr := "-" + stringToNum(line[start:end]) 
				val, _ := strconv.Atoi(numStr) // Wait, I haven't imported strconv yet? Yes, standard library.
			} else if line[i] >= '0' && line[i] <= '9' {
				if i == start || !isDigit(line[i-1]) {
					numStr += string(line[i])
				}
			}

			// This manual parsing is getting messy. Let's use a cleaner loop structure with imports allowed (standard lib).
			
			break // Break inner to restart logic cleanly? No, let's just do it right once.
		}
		
		// Correct Implementation Plan:
		// 1. Read all input into one big string or process line by line.
		// 2. Iterate through characters. If digit or minus (and next is digit), build number string.
		// 3. Parse to int64, add to map for counting.
		
	}

	fmt.Println("count=" + fmt.Sprintf("%d", len(counts)) + " sum="+fmt.Sprint(sumOfValues())) // Wait, I need a function or variable for sum? 
	// Spec says: count=<n> sum=<sum>. Need actual values.
	
	// Let's restart the code block with clean logic and imports.

}

func isDigit(c byte) bool { return c >= '0' && c <= '9' }

var totalSum int64 = 0 // This won't work if I don't accumulate it properly in a loop before printing.
// Let's restructure the whole thing to be correct and minimal.

func main() {
	counts := make(map[int]int) 
	sumVal := int64(0)
	
	scanner := bufio.NewScanner(os.Stdin) // Wait, I need 'os' imported too? Yes.
	// But wait, imports must be at the top of package body in Go.
}
