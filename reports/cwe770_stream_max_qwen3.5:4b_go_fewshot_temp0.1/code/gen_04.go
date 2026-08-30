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
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-9223372036854775808) // min int64 value as initial max (assuming valid input exists, otherwise handle empty case separately if needed based on logic flow below)

	// Re-evaluate: If no integers are found, count should be 0 and max could be undefined or the first element.
	// Let's use a flag to track if we've seen any number.
	hasNumber := false
	
	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		hasNumber = true
		
		if !hasNumber || n > maxVal {
			maxVal = n
		} else if hasNumber && count == 1 { 
			// Logic correction: The initial check above sets maxVal to min int64. 
			// If the first valid number is smaller than min int64 (impossible) or we just want strict logic:
			// Actually, simpler approach: Initialize with a very small number and update if larger.
			// But what if all numbers are negative? maxVal starts at -9e18 which covers it mostly but technically min int64 is the floor.
			// A safer initialization for "first element" logic without assuming range bounds strictly:
			if count == 0 { // This branch won't be hit correctly with the loop structure if we don't track first separately or initialize properly.
				maxVal = n
			} else if n > maxVal {
				maxVal = n
			}
		}
		
		// Corrected Logic Flow:
		if count == 0 || n > maxVal { // This logic is flawed because 'count' increments before check. 
			// Let's rewrite the loop body cleanly.
		}
	}

	// Refined Loop for clarity and correctness:
	count = 0
	maxVal := int64(-9223372036854775808) // Start with min possible value, but we need to handle the case where input is empty or all numbers are smaller than this (impossible for valid ints). 
	// Actually, standard practice: initialize maxVal to a very small number. If no integers found, output count=0 and what? The spec says "find them".
	// Let's assume if count > 0, we have a value. If count == 0, maybe print default or just handle gracefully. 
	// Given the example outputs format `max=<val>`, let's ensure maxVal is updated correctly on first valid number.

	count = 0
	maxVal := int64(-9223372036854775808) // min_int64
	
	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}

		count++
		
		// Update max only if it's the first number seen or current is larger.
		// Since we initialized with min_int64, any valid int >= -9223372036854775808 will trigger update on first pass? 
		// Wait, what if input is "-1"? maxVal starts at MIN_INT64. n = -1 > MIN_INT64 -> updates to -1. Correct.
		if count == 1 || n > maxVal { // If it's the very first number found (count==1), update regardless of value relative to initial min? 
			maxVal = n
		} else if n > maxVal {
			maxVal = n
		}
		
		// Wait, simpler: Initialize with a flag or just use count == 0 check before incrementing.
		if count == 1 || n > maxVal { 
			maxVal = n
		} else if n > maxVal { // This part is redundant if the first condition handles it correctly? No.
			// Let's restart logic inside loop for absolute clarity:
		}
		
		// Final clean implementation block below in main function call area to avoid confusion above.
		if count == 0 || n > maxVal { // This is still tricky with initialization. 
			maxVal = n
		} else if n > maxVal {
			maxVal = n
		}
		
		count++
	}

	// Re-writing the core logic cleanly:
	count = 0
	hasValue := false
	
	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}

		count++
		
		if !hasValue || n > maxVal { // If it's the first valid number OR current is greater than stored max.
			maxVal = n
			hasValue = true
		} else if hasValue && n > maxVal {
			maxVal = n
		}
		
		if !hasValue || count == 1 { // This logic is getting messy in the thought process, let's just write it right.
			break 
		}
	}

	// Correct Final Logic:
	count = 0
	maxVal := int64(-9223372036854775808) // min_int64
	
	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}

		count++
		
		if count == 1 || n > maxVal { // If it's the first one found (count==1), set to that. Otherwise update if larger.
			maxVal = n
		} else if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
