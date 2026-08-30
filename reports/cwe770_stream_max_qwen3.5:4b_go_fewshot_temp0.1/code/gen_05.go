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
								// Actually, if no valid integers are found, max should probably be the first one or handled as undefined?
								// The spec says "count" and "max". If count is 0, what about max?
								// Looking at example 1: it initializes max=0. But that's for positive/negative logic. 
								// For a general integer list, if the list is empty or has no valid ints, max should be... undefined?
								// Let's assume standard behavior: initialize with min int64 and update only on first valid find.
								// However, to match Example 1 style where it might output something even for edge cases (though Ex 1 had at least one), 
								// let's stick to the logic: if no numbers found, count=0, max is undefined or min int64? 
								// Given "max=<最大>", implies a value exists. But spec says ignore invalid elements.
								// If all are ignored, we have 0 valid items. What is max of empty set? Usually identity element for max (min_int).
								// Let's initialize with min int64 (-9223372036854775808) but only update if found. 
								// Wait, Example 1 initialized `max := 0`. That was specific to its context (maybe assuming positive?).
								// For robustness: initialize with min int64 value? Or handle the "no numbers" case specifically?
								// Let's assume valid input always has at least one number if count > 0. 
								// If count == 0, max could be anything or we can output a placeholder. But let's follow strict logic:
								// Initialize `max` to the smallest possible int64 so it updates on first real value? 
								// Or better: initialize with nil/flag and set if found.
								// Let's use min_int64 as initial max, but only update if we find a number >= current_max.
								// Actually, standard practice for "max of empty" is often undefined or identity (min). 
								// But let's look at the constraint: "values fit in 64bit integer".
								// Let's initialize max to -9223372036854775808 (int64 min) but only if we find numbers.
								// Wait, Example 1 output `max=...`. If input is empty or invalid? 
								// The spec says "ignore elements that cannot be interpreted as integers".
								// So if all are ignored -> count=0. What about max? 
								// Let's assume the user provides at least one valid integer for a meaningful test, but handle 0 case gracefully.
								// If we initialize `max` to int64(-1<<63 - 2) (i.e., min_int + 1), it won't update if only smaller numbers exist? No.
								// Correct logic: Initialize max with the first valid number found, or a very small number that will be updated. 
								// Since int64 range is large, let's initialize `max` to -9223372036854775808 (min_int).
								// But if the input has only numbers smaller than min_int? Impossible for valid ints.
								// So initializing with min_int is safe as a lower bound, EXCEPT: what if all inputs are ignored? 
								// Then max remains min_int. Is that correct? Probably not ideal but acceptable given "max of empty set" ambiguity.
								// However, to be safer and match Example 1's style (which started with 0), let's start with a flag or handle the first element separately.
								// Let's use `first := true` logic like Ex 1.

	maxVal := int64(0) // Placeholder? No, for negative numbers this fails if all are negative and we init to 0. 
						// Better: initialize with min_int64 value but only update on first valid assignment?
						// Actually, let's just use a flag `first` like in Example 1.

	maxVal = int64(-9223372036854775808) // This is min_int64. 
											// If we find -9223372036854775808, it stays same? That's fine for max logic (>=).
											// But if input has NO valid integers, this value remains. Is that desired?
											// Let's assume there is at least one integer in test cases usually. 
											// If not, and we output min_int64 as max of empty set... it might be confusing but logically consistent with identity element for "max" (if defined).
											// Wait, Example 1 initialized `max := 0`. It didn't use a flag explicitly in the loop condition logic except checking `first || n > max`. 
											// Ah! Ex 1 used: `if first || n > max { ... }` where `first=true`, then sets `max=n`, `first=false`.
											// This handles negative numbers correctly (e.g. -5 vs 0). If input is just [-5], it picks -5. 
											// So I will replicate that pattern: initialize first to true, max doesn't matter initially because of the OR condition.

	maxVal = int64(0) // Value before update
	first := true
	
	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore invalid elements as per spec
		}

		if first || n > maxVal {
			maxVal = n
			first = false
		}
		
		count++
	}
	
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
