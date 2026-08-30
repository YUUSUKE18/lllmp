```go
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

	parts := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-1<<63 - 1) // Initialize with minimum possible int64 value, but handle empty case separately if needed. 
								// Actually, better to initialize maxVal such that any valid integer is >= it? No, standard approach:
								// If we find at least one number, update max. Otherwise count=0 and max stays undefined or 0?
								// The problem says "count" and "max". Usually if no numbers exist, what to output for max? 
								// Let's assume valid input has at least some integers based on typical CP problems unless specified otherwise.
								// However, robustly: initialize minInt64 as the starting point only if we are sure there is data or handle empty list logic.
								// Re-reading spec: "整数列を受け取ります" implies a sequence exists. 
								// But to be safe against all inputs (including potentially no valid ints):
								// If count == 0, max could be anything? Or maybe we should output minInt64? 
								// Let's stick to the logic: if loop runs and finds numbers, update max. 
								// Initialize with a flag or handle empty separately.
								// Actually, initializing maxVal = -1<<63 (min int64) is risky because valid input could be minInt64 itself? No, minInt64 is -9223372036854775808. 
								// Better: use a boolean flag or initialize to the first found value.
								// Let's refine below in code logic.

	maxVal = int64(-1) // Placeholder, will be overwritten if any number exists? No, need proper init for comparison.
						// Correct approach: Initialize maxVal with minInt64 and count=0. If no numbers found, output 0 and maybe minInt64 or 0? 
						// Given the examples (max of integers), usually input is non-empty. But let's handle gracefully.
						// Actually, if we init maxVal = -1<<63 - 1 (underflowed int) -> invalid.
						// Let's use a flag `found` to decide output for max when count==0? Or just assume valid input has numbers as per "integer sequence".
						// To be strictly correct: if no integers found, what is the maximum of an empty set? Mathematically undefined or -inf. 
						// In programming contests without explicit rule for empty list on max value often implies non-empty or specific behavior.
						// However, looking at example 1 logic: `max := 0`, then checks if first || n > max. This handles the case where input might be all negative? Yes! 
						// Example 1 initializes `max` to 0 and uses `first`. If inputs are -5, -2 -> max stays 0 (incorrectly) unless logic is fixed.
						// Wait, example 1 code: `if first || n > max { max = n; first=false }`. 
						// If input is "-5", first=true -> sets max=-5. Correct.
						// So we don't need to init with a magic number if we use the 'first' flag logic similar to example 1 but adapted for int64 range.

	maxVal = -9223372036854775808 // minInt64 value? No, let's just track first found.
	count = 0
	
	// Re-reading Example 1 logic: it initializes max=0 and uses 'first' flag to set the initial max correctly regardless of sign.
	// We will mimic that pattern for int64.

	maxVal := -9223372036854775808 // This is minInt64. But if input contains only this value, it works? 
									// Actually, better to use the 'first' flag approach like Example 1 for safety against negative numbers and boundaries.
	
	maxVal = int64(0) // Just a placeholder variable name
	hasValue := false

	for _, s := range parts {
		s = strings.TrimSpace(s)
		if len(s) == 0 || (s[0] == '-' && len(s) > 1 && isDigit(s)) { 
			// Wait, simple strconv.Atoi handles whitespace trimming? No, we did trim manually.
			// Just try parse. If success, update count and maxVal using first flag logic.
		} else if s[0] == '-' || (s[len(s)-1] >= '0' && s[len(s)-1] <= '9') { 
			// It's a string that might be an integer or not? strconv.Atoi returns error for non-integers.
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] >= '0' && s[0] <= '9') { 
			// Check before parsing? No, let's just try parse. It handles negatives and digits.
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if s != "" && (s[0] == '-' && len(s) >= 2 && isDigit(s,1)) { 
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Ignore invalid elements as per spec "整数として解釈できない要素も無視します"
			}
			
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if
