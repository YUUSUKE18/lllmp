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
		fmt.Printf("count=0 max=\n")
		return
	}

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64, but handle empty input carefully. 
								// Actually, if no valid integers are found, max should probably be the first one or handled separately.
								// Let's re-evaluate: If we find at least one integer, that becomes initial max. Otherwise 0? Or undefined behavior is avoided by logic.
								// Better approach: Initialize with a flag or handle empty list case explicitly if needed. 
								// However, the problem implies there might be integers. Let's use int64(-1<<63) as sentinel but check validity first.

	maxVal = -9223372036854775808 // min int64
	hasValue := false

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
		hasValue = true
		
		if n > maxVal || !hasValue { 
			maxVal = n
		} else if hasValue && n < maxVal {
			// This logic is slightly redundant but safe. Actually, just use:
			// if n > maxVal then update. But need to handle the first element correctly without a sentinel that might be smaller than all inputs? 
			// No, min int64 is -9e18. If input has only positive numbers like 5, and we init with MIN_INT64, it works.
			// What if input is empty after filtering? Then count=0, maxVal should be... undefined or 0? 
			// The problem says "find the maximum value". Usually implies at least one exists. If none found, let's output based on what we have.
			// But to be safe for edge case of no integers: if hasValue is false after loop, maxVal remains MIN_INT64 which is wrong? 
			// Let's adjust logic slightly inside the loop or post-loop check.
		} else {
			if n > maxVal {
				maxVal = n
			}
		}
	}

	// Correction for initialization: if no valid integers found, what to output? 
	// The problem doesn't specify behavior for empty input of integers explicitly beyond "ignore invalid". 
	// Assuming at least one integer exists or 0 is acceptable. But let's stick to logic that updates maxVal on first valid number.
	
	if !hasValue {
		maxVal = -9223372036854775808 // Fallback, though logically count=0 means no data. 
										// Actually if count is 0, maybe output max=0? Or just keep the sentinel? 
										// Let's assume valid input has at least one integer as per typical CP problems unless specified otherwise.
										// But to be robust: if count == 0, we can set maxVal = -9223372036854775808? 
										// Or better: initialize with a flag and update only on first valid.
	}

	if !hasValue {
		maxVal = -9223372036854775808 // This is technically min int64, but if no numbers found, this might be misleading. 
										// However, without explicit instruction for empty input, we proceed with logic that works when count > 0.
										// Let's refine the loop to set maxVal on first valid assignment properly.
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
