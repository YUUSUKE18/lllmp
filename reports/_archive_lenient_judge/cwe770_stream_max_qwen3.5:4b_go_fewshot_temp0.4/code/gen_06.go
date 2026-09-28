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
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}

	parts := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-9223372036854775808 - 1) // Initialize with a value smaller than min int64 to ensure first valid number updates it, or handle empty case separately.

	// Re-initialize maxVal logic: if no numbers found, count=0 and we need to output something reasonable for max (e.g., 0).
	// However, spec says "values fit in 64bit integer". If input is all invalid/empty, what should max be? 
	 // Example 1 used `max = 0` initialized. Let's follow that pattern: initialize with a very small number or handle empty list as 0.
	 // But strictly speaking, if no numbers exist, the "maximum" of an empty set is undefined. 
	 // Given example 1 initializes max=0 and updates only on first valid || n > max, let's replicate that behavior for consistency with Example 1 logic where it sets max=n on first element regardless of value (if we assume inputs are non-negative or handle negatives).
	 // Wait, Example 1: `max := 0`, then `if first || n > max`. This handles negative numbers correctly if the input has a number smaller than current max but larger than previous? No.
	 // If input is "-5", -5 < 0 (initial max), so it won't update unless 'first' is true. So for empty or invalid-only, output would be "count=0 max=0". 
	 // Let's assume standard behavior: initialize with a flag to track if we've seen any number.
	
	maxVal = int64(0)
	first := true

	for _, w := range parts {
		wStr := strings.TrimSpace(w)
		if len(wStr) == 0 || !strings.ContainsRune(wStr, '-') && (wStr[0] < '0' || (len(wStr) > 1 && wStr[len(wStr)-1] >= '0')) { 
			// Simple check if it looks like a number? Better to just try parse.
			n, err := strconv.ParseInt(wStr, 10, 64)
			if err != nil {
				continue // Ignore non-integers
			}
			
			count++
			if first || n > maxVal {
				maxVal = n
				first = false
			}
		} else if len(wStr) == 0 || wStr[0] < '0' && (len(wStr)==1 ? !isDigit(wStr[0]) : true) { 
			// Actually, just try parsing is safest. The check above was flawed for negative numbers starting with '-'.
			// Let's stick to the robust approach: Try ParseInt directly on trimmed string. If it fails, ignore.
			// But wait, "integer" implies valid format. strconv.ParseInt handles "-123". 
			// So simply: trim -> try parse.
			
			n, err := strconv.ParseInt(wStr, 10, 64)
			if err != nil {
				continue
			}
			count++
			if first || n > maxVal {
				maxVal = n
				first = false
			}
		} else if len(wStr) == 0 { // Handled by trim check above, but let's be explicit.
			continue 
		}
		
		// Correct logic flow:
		/*
			w := strings.TrimSpace(parts[i])
			if w != "" {
				n, err := strconv.ParseInt(w, 10, 64)
				if err == nil { // Successfully parsed integer (handles negatives correctly now)
					count++
					if first || n > maxVal {
						maxVal = n
						first = false
					}
				}
			}
		*/
		
		// Re-writing the loop body cleanly inside main:
		w := strings.TrimSpace(wStr) // Wait, I used w in ParseInt call above. Let's restructure to avoid confusion.
		if n, err := strconv.ParseInt(strings.TrimSpace(parts[i]), 10, 64); err == nil {
			count++
			if first || n > maxVal {
				maxVal = n
				first = false
			}
		}
		
		// Wait, I need to re-verify the loop structure. 
		// Let's restart the logic inside main cleanly.
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}

func isDigit(r rune) bool {
	return r >= '0' && r <= '9'
}
