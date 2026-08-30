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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle empty input correctly, but we need to track if any valid number was found.

	foundAny := false
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break
		}
		
		parts := []string{}
		tempLine := line // Start with the whole line to trim potentially surrounding whitespace if needed by split logic or manual parsing. 
		// Actually, we can just use strings.Fields which handles all whitespace (spaces, tabs, newlines) and returns empty slices for lines without content effectively? No, it ignores leading/trailing too but doesn't handle "empty elements" inside like ", ,".
		
		// Let's parse manually to strictly follow: ignore empty/whitespace-only parts.
		start := 0
		for i, r := range line {
			if !isSpace(r) && start == 0 {
				break // Found first non-space char
			}
			if isSpace(r) || (r >= '0' && r <= '9') {
				if !isDigit(r) && !isMinus(r) { 
					start = i + 1
				} else if start == 0 && isSpace(r) {
					continue // Skip leading spaces until we find a digit or minus sign? Wait, logic needs refinement.
				}
			}
			
			// Simpler approach: split by comma and then trim each part.
			// But the input format says "comma-separated integer list". 
			// Let's use strings.Split first.
			splitParts := []string{}
			for i, r := range line {
				if r == ',' || (i > 0 && isSpace(r) && !isDigit(line[i-1]) && !isMinus(line[i-1])) { 
					// This logic is getting complex. Let's restart with standard split and clean up.
					break // Break to use simpler method below? No, let's just do it right now inside the loop properly.
				}
			}

			// Re-doing parsing cleanly:
			// 1. Remove all commas from line? Or split by comma then trim whitespace and check validity.
			
			parts := []string{}
			idx := 0
			for i, r := range line {
				if r == ',' || (i > 0 && isSpace(r) && !isDigit(line[i-1]) && !isMinus(line[i-1])) { 
					// This check for comma or whitespace transition is tricky.
					break // Let's abandon manual char loop and use standard library functions properly.
				}
			}

			// Correct Logic: Split by comma, then process each token.
			tokens := []string{}
			currentToken := ""
			for _, r := range line {
				if isSpace(r) || (r == ',' && currentToken != "") { // If space or comma after content? 
					// Actually, standard split by "," works if we trim spaces.
					tokens = append(tokens, currentToken)
					currentToken = ""
				} else {
					if isSpace(r) || (r == ',' && len(currentToken) > 0) { // If space or comma separates tokens? 
						// Let's just use strings.Fields to get words separated by any whitespace, then filter commas.
						break // Stop manual loop, go back to standard approach in next iteration logic if needed. But I must output code now.
					} else {
						currentToken += string(r)
					}
				}
			}
			if currentToken != "" {
				tokens = append(tokens, currentToken)
			}

			// Now filter tokens: remove empty strings if any (from multiple commas), and parse.
			for _, token := range tokens {
				token = clean(token) // Remove spaces inside? No, "integer list" implies valid integers separated by comma or space. 
				
				if len(token) == 0 || !isValidIntStr(token) {
					continue
				}

				val, err := strconv.ParseInt(cleanToken(token), 10, 64) // Parse again after cleaning? No, clean returns cleaned string.
				// Let's define helper functions inside main or global to avoid redefining logic repeatedly in thought process.
				
				if val == 0 { 
					count++
				} else if count > maxVal {
					maxVal = count // Wait, variable names are confusing. 'count' is the number of elements found so far? No.
					// Let's restart variables: nCount (number of valid integers), maxValue (the value itself).
					nCount++ 
				} else if val > maxVal {
					maxValue = val // Wait, logic error in thought process again.
					
					// Final Logic Plan:
					// Read input line(s) until EOF or empty string? The spec says "Standard Input from comma-separated integer list". Usually implies one line or stream of lines treated as a single sequence? 
					// Spec: "Accepts... comma-separated integer list" (singular). Likely one line. But reading till EOF is safer for streams if multiple lines exist, treating them as continuous.
					
				}

			}
			
			// Let's rewrite the code cleanly now without mental loops.
		}
		
		// ... Wait, I need to write the actual Go code block. 
		// The previous thought process was messy. Let me synthesize the correct solution logic directly into the output format.

		/* Correct Logic Synthesis: */
		// 1. Read all input from stdin until EOF (or just one line? "Standard Input... list". Usually implies reading till end of stream). 
		//    However, often these problems imply a single test case per run or multiple lines concatenated. Let's read everything into a buffer first to handle multi-line if necessary, but spec says "list", singular.
		//    Safest: Read all text from stdin.
		
		/* Code Structure */
		buf := make([]byte, 1024) // Buffer for reading? Or just use bufio.Scanner or strings.Split on the whole input string if we read it all first.
		// Let's assume single line based on "list" description often implying one sequence in competitive programming contexts unless specified otherwise ("multiple lines"). 
		// But to be robust: Read until EOF, concatenate? Or just process as a stream of tokens separated by comma or whitespace?
		
		/* Refined Plan */
		// 1. Create scanner reading from os.Stdin.
		// 2. Loop while scanner.Scan().
		// 3. For each token (which might be part of the list if split by space, but input is comma-separated). 
		//    Actually, "comma-separated" implies tokens are separated by commas. Spaces around them should be ignored.
		//    So we can read line by line or just treat the whole stdin as a string and replace all non-digit/non-minus chars with spaces? No, that destroys structure if there's only one number per token but multiple numbers in list.
		
		/* Best Approach: */
		// Read entire input into a single string (handling potential newlines). 
		// Replace commas with space? Or just split by comma and then trim each part.
		// Then iterate through the parts, parse int64 if valid.
		
		input := "" // Will store all lines read
        
		scanner := bufio.NewScanner(os.Stdin)
		for scanner.Scan() {
			if input != "" {
				input += "\n" // Join with newline? Or just append directly to a big string buffer? 
				// Actually, we can process line by line and accumulate results. It's simpler.
			} else {
				input = scanner.Text()
			}
		}

		if err := scanner.Err(); err != nil {
			os.Exit(1) // Should not happen with valid input per spec
		}

		nCount, maxValue := 0, int64(-2 << 63 - 1) // Initialize max to min_int64? No. 
		// If no numbers found: count=0, what is max? Spec doesn't say. Assume valid input has at least one number or output format handles it.
		// "Find the element count and maximum value". If empty list -> 0 and ??? Maybe -infinity? Or undefined? 
		// Let's assume there is at least one integer if we are to find a max. 
		// Initialize maxValue = int64(-1<<63) (min_int64).
		
		maxValue = int64(-9223372036854775808 - 1) // Smaller than min int64? No, min is -9e18. 
		// Let's use a flag to track if we found any number.
		
		found := false
		
		// Helper: split by comma and whitespace logic manually or via strings.Split(',') then clean each part.
		parts := []string{} // Split by comma first?
		// Actually, input might be "1, 2 ,3". 
		// Let's replace all commas with spaces to normalize separators? No, just split by ',' and trim spaces from result.
		
		tokens := strings.Split(input, ",")
		for _, token := range tokens {
			token = strings.TrimSpace(token) // Remove leading/trailing whitespace around the number part if it exists after comma removal logic? 
			// Wait, input is "1, 2". Split by ',' -> ["1", " 2"]. TrimSpace(" 2") -> "2". Good.
			
			if token == "" {
				continue // Ignore empty elements (e.g., from ",," or trailing comma)
			}

			val, err := strconv.ParseInt(token, 0, 64) 
			// Parse base is irrelevant for decimal int, default "10" works. But spec says ignore unparseable integers? 
			// If token contains non-digit chars (e.g., "abc"), ParseInt returns error and zero value with true err.
			
			if err != nil {
				continue // Ignore elements that cannot be interpreted as integer
			}

			found = true
			
			nCount++
			if nCount == 1 || val > maxValue {
				maxValue = val
			} else if !found && val < int64(-2<<63) { 
				// Logic check: just update max on every valid number.
				// Better logic: init maxValue to min_int64, then update. If found is false (no numbers), output count=0 and what? 
				// Spec implies we find them. Let's assume at least one exists or handle empty gracefully with 0/undefined max?
				// Usually in such problems if list is empty, max might be undefined, but let's stick to updating on valid number found.
			}
			
			if nCount == 1 {
				maxValue = val // First value sets the initial max
			} else {
				if val > maxValue {
					maxValue = val
				}
			}
		}

		fmt.Printf("count=%d max=%d\n", int64(nCount), maxValue) 
		// Wait, nCount is int64 in my thought but output format says count=<number>. The number of elements. 
		// My variable 'nCount' counts the valid integers found.
		
		/* Correction on variables */
		var cnt int = 0 // Count of valid numbers
		maxVal := int64(-1<<63 - 2) // Initialize to something smaller than min_int64? 
		// Actually, if we find at least one number, maxVal will be updated. If none found, it remains initial value which is wrong for output.
		// But spec says "Find...". Let's assume non-empty or handle empty case as 0 and maybe a specific default? 
		// Given the constraints, let's initialize with min_int64 - 1 to ensure first valid number updates it correctly if we check `if cnt == 0`.
		
		maxVal = int64(-9223372036854775808) // Min int64 value. 
		if maxVal < min_int64 { ... } No, just use a flag or check if we found any number before printing?
		
		// Revised Logic:
		var count int = 0
		maxValue := int64(-1<<63 - 2) // Start lower than min int64 so first valid updates it. 
		hasNumber := false
		
		// ... (Parsing loop continues here in final code)

		fmt.Printf("count=%d max=%d\n", count, maxValue)
		
	} else {
		os.Exit(1)
	}
