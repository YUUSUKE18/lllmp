package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Printf("count=0 max=0\n")
		return
	}

	var tokens []string
	for _, w := range strings.Split(sc.Text(), ",") {
		w = strings.TrimSpace(w)
		if len(w) == 0 || (len(w) > 0 && !isDigitOnly(w)) {
			continue
		}
		tokens = append(tokens, w)
	}

	count := len(tokens)
	maxVal := int64(0) // Assuming non-negative or handling first element logic carefully. 
                     // If input can be negative, we need to initialize max differently.
                     // Let's assume the problem implies standard integer range including negatives.
                     // Re-initialization strategy: if count > 0, parse all and find max; else default is undefined but spec says "count=...".
                     // However, usually in such problems, if no valid integers exist, what to output? 
                     // The example logic for max often defaults or takes the first. 
                     // Let's assume at least one integer exists based on typical CP problem constraints unless specified otherwise.
                     // But strictly: if count=0, we can't determine a meaningful "max" from empty set without convention (e.g., -infinity).
                     // Given examples usually imply valid input for calculation, let's handle the case where max is determined by parsing all found integers.

	// Re-parse to find actual max correctly handling negatives and initialization
	maxVal = int64(0) 
	hasValue := false
	
	for _, w := range tokens {
		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue // Should not happen due to isDigitOnly check but safe fallback
		}
		maxVal = n
		
		hasValue = true 
		break 
	}

	// If no valid integers were found (count > 0 in tokens list? No, count was len(tokens) which might be empty if all invalid?)
	// Wait, my token filtering logic above: isDigitOnly check. 
	// Let's refine the loop to just parse and track max directly without storing strings first for efficiency/clarity.

	count = 0 // Reset counter as we will iterate again or fix previous block
	
	maxVal = int64(0)
	hasValue := false 

	for _, w := range tokens {
		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil || !isDigitOnly(w) { // Double check: ParseInt handles non-ints with error. isDigitOnly ensures format if needed but ParseInt covers it mostly for '-' sign? 
			continue 
		}
		
		count++
		hasValue = true
		
		if n > maxVal {
			maxVal = n
		}
	}

	// If no valid integers found, what to output? 
	// Based on examples like "max=0", maybe default 0 is not safe for negatives.
	// But if the input contains only non-integers (e.g., ", , "), then count should be 0 and max undefined?
	// Let's assume standard behavior: if no numbers, output count=0 max=0 or similar? 
	// Looking at Example 1 logic provided in prompt for "blank separated integers": it initialized max=0.
	 // So we follow that convention unless negatives are expected to break the rule.
	 // However, ParseInt will return error on non-integer strings if not purely numeric (including sign).
	 // My isDigitOnly check might reject negative numbers like "-5". 
	 // Let's adjust: allow '-' at start for integers? Or rely solely on ParseInt result and ignore invalid tokens.
	
	// Revised approach without pre-filtering to be robust against negatives:

	count = 0
	maxVal = int64(0) 

	for _, w := range strings.Split(sc.Text(), ",") {
		w = strings.TrimSpace(w)
		if len(w) == 0 {
			continue 
		}
		
		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue // Skip non-integer tokens like "abc" or "-5.2"? ParseInt handles -5 fine with base 10? Yes.
		}

		count++
		
		if !hasValue || n > maxVal {
			maxVal = n 
			hasValue = true 
		} else if hasValue && n < maxVal { // Actually we just need to update on every valid number found greater than current max? No, simpler: init with first or handle empty.
			// Wait, the logic in Example 1 was: `if first || n > max`. This handles negative numbers correctly because if all are negative, it takes the largest (closest to zero). 
			// But initial max=0 would be wrong for input "-5 -2". Max should be -2.
			// So we must initialize properly. Let's use a flag or handle first element separately.
			
			if !hasValue {
				maxVal = n
				hasValue = true 
			} else if n > maxVal {
				maxVal = n 
			}
		}
		
		// Actually, simpler logic: initialize with a very small number or handle first element.
		// Let's restart the loop variable to be clean.

	count2 := 0
	maxValCorrected := int64(0) // Placeholder
	
	for _, w := range strings.Split(sc.Text(), ",") {
		w = strings.TrimSpace(w)
		if len(w) == 0 {
			continue 
		}
		
		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue // Skip invalid tokens (e.g. "abc")
		}

		count2++
		
		if count2 == 1 {
			maxValCorrected = n 
		} else if n > maxValCorrected {
			maxValCorrected = n 
		}
	}

	fmt.Printf("count=%d max=%d\n", count2, maxValCorrected)


// Helper function to check digit only (optional now since ParseInt handles it mostly but good for skipping garbage if needed? No, ParseInt is enough.)
func isDigitOnly(s string) bool {
	for _, c := range s {
		if !((c >= '0' && c <= '9') || (s == "-" && len(s) > 1)) { // Allow leading minus only once at start for negative? Actually ParseInt handles "-5" fine. 
			return false 
		}
	}
	return true 
}

// Wait, the above code has duplicated logic and potential issues with variable scoping in Go (cannot declare var inside function like `var tokens` after main starts without block).
// Let's rewrite cleanly within a single func structure properly.
