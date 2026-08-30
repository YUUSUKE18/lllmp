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
								// Actually, if no valid integers are found, max should probably be the first one or handled logically.
								// Let's re-evaluate: If we find at least one integer, that becomes initial max.
								// Better approach: use a flag for initialization.

	hasValue := false
	maxVal = int64(0) // Placeholder

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
		if !hasValue || n > maxVal {
			maxVal = n
			hasValue = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, hasValue && maxVal == 0 ? int64(0) : maxVal) 
	// Wait, if no integers were found (hasValue is false), what should be printed? The spec says "find them". 
	// If none exist, count=0. What about max? Usually undefined or min value.
	// Let's assume if count > 0, we output the real max. If count == 0, maybe print a placeholder or just handle gracefully.
	// Re-reading spec: "find their element count and maximum value". 
	// If no integers found, max is technically undefined in math but for programming tasks often min_int64 or similar.
	// However, looking at the example logic (max=0 initially), if input has only invalid strings, it might output 0?
	 // But int can be negative. Let's stick to: initialize with a very small number IF we assume valid inputs exist, 
	 // OR use a flag. If no integers found, let's print count=0 and max=<some indicator or just handle the case where loop doesn't set hasValue>.
	 // To be safe against empty input resulting in weird output like "max=-9223372036854775808" (min int), 
	 // let's use a flag. If !hasValue, we can print max=0 or handle it specifically?
	 // The prompt examples don't show edge cases of empty/invalid input explicitly other than ignoring them.
	 // Let's assume if no integers are found, the "max" part is tricky. 
	 // A common convention in such problems when count==0 is to output max=0 or min_int64? 
	 // Given the example 1 initialized `max := 0`, it implies non-negative bias unless specified otherwise for negatives.
	 // But int64 range includes negative numbers. 
	 // Let's refine: if no integers found, we can't determine a meaningful max without context. 
	 // However, to strictly follow "find them", if none exist, perhaps output count=0 and max=<undefined>? No, must be integer.
	 // Let's assume the input will contain at least one valid integer or defaulting logic similar to example 1 (start with 0).
	 // But wait, Example 1 started `max := 0`. If inputs were all negative, it would fail if we don't handle negatives correctly? 
	 // Ah, Example 1 code: `if first || n > max { ... }` where initial max is 0. This means for input "-5", output "max=0" which is WRONG mathematically but follows the example's logic pattern IF inputs are non-negative or if we follow that specific initialization style?
	 // Actually, Example 1 code provided in prompt: `max := 0`. If input is `-5`, loop runs. -5 > 0 is false. max remains 0. Output "max=0". This seems to be the intended behavior of the example logic (treating it as finding non-negative or just initializing low).
	 // BUT, standard integer problems usually expect correct min/max regardless of sign unless specified. 
	 // Let's look at Example 1 again carefully: `if first || n > max`. If input is "-5", `first` is true initially? No, `max=0`, `first=true`. Loop -5. `-5 > 0` false. `first` stays true? Wait.
	 // Logic in Ex 1: 
	 // Init: max=0, first=true.
	 // Input "-5": n=-5. Check `first || n>max`. True (because of 'first'). Enter block. max becomes -5. first=false. Correct!
	 // So the logic works for negatives too because `first` is true initially regardless of value 0 vs negative? 
	 // Wait, if input "-1", "2". First: -1 > 0 false. But `first` is true so it enters. max=-1. second: 2 > -1 true. max=2. Correct.
	 // What if input empty string or only invalid chars? Then loop doesn't run, output count=0, max=0 (from init). 
	 // This matches the requirement "ignore elements that cannot be interpreted as integers". If none found, default to 0 seems consistent with Example 1's initialization strategy.
	
	if !hasValue {
		fmt.Printf("count=%d max=\n", count) // Or maybe just print nothing for max? No, must output format. 
		// Let's assume if no integers, we can't give a valid max. But to match Ex 1 style (init=0), let's force it or handle flag differently.
		// Actually, the safest bet that works like Example 1 is: initialize with `int64(-2<<63)`? No, Ex 1 used 0 and relied on 'first'. 
		// Let's replicate Ex 1 logic exactly for max initialization to be safe regarding "Example style".
	}

	fmt.Printf("count=%d max=%d\n", count, hasValue ? maxVal : int64(0)) // If no values found, defaulting to 0 as per Example 1 init behavior.
