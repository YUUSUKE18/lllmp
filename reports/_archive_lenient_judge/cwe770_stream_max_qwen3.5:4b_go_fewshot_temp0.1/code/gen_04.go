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
								// Actually, if no valid integers are found, max should probably be represented as such or handled logically.
								// However, the spec implies we find count and max from *valid* elements. If none exist, what is max?
								// Looking at example 1: it initializes max=0 but that's for positive/negative logic. 
							 // Let's assume if no valid integers are found, output should reflect count=0. For max, we need a safe initial value or handle the empty case specifically.
							 // Re-reading spec: "最大値を求めます". If list is empty after filtering? The problem doesn't specify behavior for all-invalid input explicitly beyond ignoring invalid elements. 
							 // To be robust: if count remains 0 (no valid ints), we can output max= or use a sentinel, but standard practice in such problems without explicit "empty" rule often implies the set of numbers is non-empty or undefined.
							 // Let's assume at least one integer exists based on typical CP problem patterns unless specified otherwise. 
							 // But to be safe against empty input: if count==0, we can't determine max meaningfully in a standard way without error. 
							 // However, the example 1 initializes `max=0` and updates only if n > max or first is true (which handles negatives).
							 // Let's follow Example 1 logic but adapted for int64 range properly.

	// Refined approach: Initialize with a very small number that represents negative infinity conceptually, 
	// OR handle the case where no numbers are found separately if needed. But since we must output `max=<val>`,
	 // and input might be empty or all non-integers -> let's assume valid inputs per typical constraints unless stated "handle edge cases".
	 // Actually, Example 1 handles negatives correctly by initializing max=0? No, wait: 
	 // In Ex 1: if first is true OR n > max. If input has -5, then -5 < 0 so it won't update if initialized to 0 and 'first' logic isn't used for negative check properly?
	 // Wait, Example 1 code: `if first || n > max`. 
	 // Case: Input "-5". Loop starts. f="-5", n=-5. first=true -> enters block. max becomes -5, first=false. Correct.
	 // So initialization of max doesn't matter if 'first' flag is used correctly to capture the very first valid number regardless of value.

	maxVal = int64(0) 
	first := true
	
	for _, t := range tokens {
		s := strings.TrimSpace(t)
		if s == "" {
			continue // Skip empty elements (e.g., from "1,,2")
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore non-integer strings like "abc" or ",," 
		}

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
