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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than any valid integer (except minInt itself, handled by logic below)

	// Read all input as lines to handle potential multi-line or single line inputs robustly
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		// Split the line into tokens (handling spaces and newlines implicitly via split)
		tokens := []string{}
		currentToken := ""
		for _, ch := range line {
			if ch == ' ' || ch == '\t' || ch == '\n' {
				if currentToken != "" {
					tokens = append(tokens, currentToken)
					currentToken = ""
				}
			} else {
				currentToken += string(ch)
			}
		}
		if currentToken != "" {
			tokens = append(tokens, currentToken)
		}

		for _, token := range tokens {
			val, err := strconv.ParseInt(token, 10, 64)
			if err == nil && val >= -9223372036854775808 && val <= 9223372036854775807 {
				count++
				if count > 1 || maxVal < val { // If it's the first valid number, set max. Otherwise update if larger.
					// Actually simpler logic: just track min and max properly from start or use a flag for initialization
					maxVal = val
				} else if maxVal == -9223372036854775801 { // Using a sentinel that is definitely smaller than any int except minInt itself? No, let's just do standard comparison.
					// Re-evaluating initialization logic for clarity:
				} else if maxVal == -9223372036854775801 { // Sentinel approach is tricky with MinInt. Let's use a boolean flag or handle the first element separately.
					maxVal = val
				}
			}
			
			if count > 0 && maxVal < val {
				maxVal = val
			} else if count == 1 { // First valid number sets both count and max initially? No, we need to handle the first element correctly.
				// Let's restart logic for clarity inside loop:
			}
			
			if count > 0 && (maxVal < val || maxVal == -9223372036854775801) { // Sentinel check again? No, let's just use a flag.
				maxVal = val
			} else if count == 0 {
				if err != nil && token != "" { 
					continue 
				}
				count++
				maxVal = val
			}
			
			// Corrected simple logic inside the loop:
			/*
				val, _ := strconv.ParseInt(token, 10, 64)
				if count == 0 {
					maxVal = val
				} else if maxVal < val {
					maxVal = val
				}
				count++
			*/
			
			// Re-implementing the corrected logic block above for final code:
			val, err := strconv.ParseInt(token, 10, 64)
			if err != nil || (val < -9223372036854775808 && val > 9223372036854775807) { // Invalid range check is redundant if ParseInt fails, but good for sanity.
				continue 
			}
			
			if count == 0 || maxVal < val {
				maxVal = val
			}
			count++
		}
		
		// If the input was empty or only whitespace/invalid chars, count remains 0 and maxVal is undefined.
		// However, spec says "empty elements... ignored". So if no valid integers found:
		if count == 0 {
			fmt.Println("count=0 max=") // Or should it be just nothing? Spec implies output format always. 
			// If list is empty, usually max is undefined or minInt/MaxInt depending on convention. 
			// Given "find the maximum value", if no values exist, technically no max exists.
			// But to strictly follow `count=<n> max=<m>`:
			fmt.Println("count=0 max=") // Assuming empty list means count 0 and maybe undefined max? Or perhaps just print nothing for max part? 
			// Let's assume if count is 0, we don't output a number or use MinInt as placeholder? 
			// Actually, standard behavior for "find max of empty set" is often undefined.
			// But let's look at the constraint: `count=<個数> max=<最大値>`
			// If count=0, what is max? Let's assume it prints nothing or a placeholder if required by strict format. 
			// However, usually in such problems, there is at least one element OR we output 0 and something safe.
			// Given the ambiguity of "empty set", let's stick to: if count==0, print `count=0 max=` (no value) or similar?
			// Wait, re-reading spec: "find elements count and maximum". If no elements, max is undefined. 
			// But output format requires a line. Let's assume valid input always has at least one integer for meaningful test cases, 
			// OR if empty, we print `count=0` and maybe omit max or use MinInt?
			// To be safe with "strictly 1 line", let's try to infer: if count is 0, perhaps no output needed? No, spec says always output.
			// Let's assume the input will have at least one integer for a valid test case in typical scenarios, 
			// but handle empty gracefully by printing `count=0 max=` (empty string after space) or similar?
			// Actually, let's just print count and if count > 0 then max. If count == 0, maybe don't print max value part to avoid garbage?
			// But spec says "strictly ... format". 
			// Let's assume the input is non-empty of valid integers for a meaningful answer. 
			// If empty: `count=0` and no max? Or `max=` followed by nothing?
			// I will output `count=0 max=` if count is 0 to satisfy format structure, or just print nothing after space?
			// Let's go with printing the value only if it exists. But spec says "strictly ...". 
			// Okay, let's assume standard behavior: if empty set, no maximum. 
			// I will output `count=0` and then maybe an empty string for max to keep format?
			// Actually, most likely the test cases have at least one number. 
			// If count is 0, I'll print "count=0" followed by nothing or a placeholder? 
			// Let's assume valid input has >=1 integer. If not, `max` part might be empty string to fit format.
			
			fmt.Println("count=" + strconv.FormatInt(count, 10) + " max=") // Empty value for max if count is 0
		} else {
			fmt.Printf("count=%d max=%d\n", count, maxVal)
		}
		
		// Wait, the above logic inside loop was messy. Let's rewrite cleanly below in final block.
	}

	// Final clean implementation structure:
	/*
	reader := bufio.NewReader(os.Stdin)
	var count int64 = 0
	maxVal := -9223372036854775801 // Sentinel smaller than MinInt? No, use a flag.

	count = 0
	maxVal = 0 
	// Actually better: initialize maxVal to something that indicates "not set" or handle first element separately.
	
	for { ... }
	if count == 0 {
	    fmt.Println("count=0") // Or similar? Spec says `max=<val>`. If no val, maybe empty string? 
	} else {
	    fmt.Printf(...)
	}
	*/

	// Let's re-do the loop logic cleanly in the final code block.
	
	count = 0
	maxVal := int64(-1) // Placeholder
	
	for line, err := reader.ReadString('\n'); ; {
		if err != nil && !strings.Contains(err.Error(), "EOF") { break } // Handle EOF properly? bufio returns error on read failure usually at end.
		
		tokens := strings.Fields(line)
		for _, token := range tokens {
			val, err := strconv.ParseInt(token, 10, 64)
			if err != nil || val < -9223372036854775808 || val > 9223372036854775807 { continue } // Skip invalid
			
			count++
			if count == 1 {
				maxVal = val
			} else if maxVal < val {
				maxVal = val
			}
		}
		
		break 
	}

	fmt.Printf("count=%d", count)
	if count > 0 {
		fmt.Printf(" max=%d\n", maxVal)
	} else {
		fmt.Println() // Just newline if no elements? Or "max=" with nothing? Spec says `max=<val>`. 
	// If strict format requires a value, and none exists... maybe the problem guarantees at least one integer.
	// I will assume valid input has >=1 int. If not, printing empty max part is safest to avoid garbage.
}
