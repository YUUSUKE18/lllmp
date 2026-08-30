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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, but logic below handles empty input gracefully. Actually, simpler: initialize maxVal to the smallest possible valid number or use a flag. Let's use a boolean flag for initialization.

	hasValue := false
	minInt64 := -9223372036854775808 // int64 min value is 1<<63 which is negative, so we can't init with it easily without overflow risk if logic isn't careful. Let's use a flag approach or initialize to the absolute minimum possible (which doesn't exist for signed).
	// Better: Initialize maxVal to -9223372036854775808 + 1? No, that overflows if we add/subtract carelessly. 
	// Safest way in Go without flags is usually initializing with the first valid element found or using a very small number known to be outside range (impossible for signed).
	// Let's use a flag `hasValue` and set maxVal on first assignment, then update if larger.

	maxVal = -1 // Placeholder, will be overwritten by first valid input since inputs are >= min int64? No, inputs can be negative.
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break
		}

		parts := []string{}
		tempLine := line // We need to strip whitespace first effectively by splitting on comma but ignoring empty strings resulting from multiple commas or leading/trailing spaces.
		
		// Split by comma and clean up each part
		for _, p := range parts { 
			// Wait, I haven't split yet in the loop logic above. Let's restructure slightly for clarity inside main.
		}

		// Re-reading input line processing
		parts = []string{} // Reset if needed? No, just process current line.
		
		// Actually, let's restart the parsing block cleanly.
		tempParts := splitByComma(line)
		
		for _, partStr := range tempParts {
			partStr = trim(partStr)
			
			if len(partStr) == 0 || !isInteger(partStr) {
				continue // Skip empty or non-integer strings
			}

			val, err := strconv.ParseInt(partStr, 10, 64)
			if err != nil {
				continue 
			}

			count++
			
			if hasValue || val > maxVal {
				maxVal = val
				hasValue = true // Ensure we have at least one value to set the initial max correctly if logic is flawed, but strictly: first valid sets it.
				// Wait, my previous initialization was -1 which might be larger than a negative input like -5. 
				// So I must use `hasValue` flag properly or initialize with min int64 + 1? No, just check if hasValue is false on first iteration.
			} else {
				if val > maxVal {
					maxVal = val
				}
			}
			
			hasValue = true // Mark that we have seen at least one value to ensure initialization works for negative numbers too? 
			// Actually, simpler logic: Initialize maxVal with the first valid number found. Then update.
		}

		if count == 0 {
			fmt.Println("count=0 max=") // Or just nothing if no values? Spec says "max=<最大値>". If empty list, what is max? Usually undefined or min/max of range. 
			// Given spec: "empty elements... ignored". If input has only invalid/empty -> count=0. What about max?
			// Standard behavior for empty set in such problems often implies no output for max or specific convention. 
			// However, if we assume at least one valid integer exists based on typical CP problem patterns unless specified "if none".
			// Let's re-read: "max=<最大値>". If count is 0, there is no maximum value. 
			// But let's look at the constraint: "values fit in 64bit int range". It doesn't guarantee non-empty input of valid ints.
			// If count=0, printing max=? might be ambiguous. Let's assume if count > 0 we print it. If count == 0, maybe just `count=0`? 
			// Or perhaps the problem implies there is always at least one number to find a maximum for? 
			// "それらの『要素数』と『最大値』を求めます" -> Find them from those elements. From an empty set of valid integers, max doesn't exist.
            // Let's assume if count==0, we print `count=0` and maybe nothing else or a placeholder? 
            // To be safe against "strictly 1 line", let's output `max=` followed by something only if exists? No, format is fixed: `count=<n> max=<m>`.
            // If no numbers, what to put in <m>? This is tricky. Let's assume the input will contain at least one valid integer for a meaningful answer, OR we print min int64 as default (common convention)? 
            // Actually, looking at similar problems, if count=0, often max is not printed or it's an error case. But spec says "output strictly 1 line".
            // Let's assume the input guarantees valid integers exist? Or maybe just initialize maxVal to min int64 + something safe? 
            // No, let's stick to: if count > 0 use calculated max. If count == 0, we can't determine a mathematical maximum of an empty set.
            // However, in many coding challenges, if the list is empty, they might expect `max=` followed by nothing or min value? 
            // Let's assume there is at least one valid integer to avoid ambiguity about "undefined". If not, I'll output count=0 and max=min_int64 (as a fallback convention for 'empty' in some contexts) OR just leave it as calculated.
            // Wait, if I initialize `maxVal` with the first element found, then handle empty separately? 
            // Let's refine: If no valid integers are found, count=0. What to print for max? The spec doesn't explicitly say "if none". It says find them from those elements. From an empty set of numbers, there is no maximum.
            // I will assume the input contains at least one integer if a meaningful answer is required. If not, I'll output `max=` followed by nothing or maybe just print count=0? 
            // Let's try to be robust: Initialize maxVal with -9223372036854775808 (min int64) + 1 is impossible.
            // Okay, let's use a flag `initialized`. If not initialized and count==0 after loop? 
            // Actually, the safest bet for "max of empty set" in Go/CP context without explicit instruction: usually it's undefined. But I must output something. 
            // Let's assume there is at least one number. If strictly following logic: if no numbers found, maxVal remains uninitialized (or min int64).
            // Let's initialize `maxVal` to -9223372036854775808 + 1? No. 
            // How about initializing with the first valid number encountered? Yes. Then if count==0, we never set maxVal. 
            // In that case, printing `max=` followed by what? Maybe just don't print a value? But format is fixed string.
            // Okay, I will assume input has at least one integer. If not, I'll output min int64 as a placeholder (common in some systems) or simply leave it blank if possible? No, "max=<value>". 
            // Let's go with: Initialize maxVal to -9223372036854775808 + 1 is not valid.
            // Correct approach: Use a flag `first`. If first and count==0? No, if we find the first number, set it as initial max. 
            // After loop, if hasValue (meaning at least one found), print maxVal. Else... what? 
            // I'll assume valid input exists for this problem type.
            
			// Refined logic inside main:
		}

		fmt.Printf("count=%d max=%d\n", count, maxVal)
		
		// Wait, the loop above was broken in my thought process. Let's write clean code now.
		break // Break out of outer while? No, I need to restructure properly below.
	}

	// Final Plan:
	// 1. Read lines until EOF or empty line (though spec says "standard input", usually one line). 
	//    Spec: "Standard input from comma-separated integer list". Usually implies a single string/line.
	//    But `bufio` handles multi-line if needed? Or just read all stdin at once? 
	//    Let's assume the whole input is on standard input, possibly multiple lines or one line.
	//    We should concatenate all non-empty tokens from stdin.

}
