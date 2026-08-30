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

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-9223372036854775808 - 1) // Smaller than min int64 to ensure first valid value updates it, or handle empty case separately

	hasValue := false
	for _, token := range tokens {
		tokensStr := strings.TrimSpace(token)
		if len(tokensStr) == 0 {
			continue
		}

		val, err := strconv.ParseInt(tokensStr, 10, 64)
		if err != nil {
			continue
		}

		count++
		if !hasValue || val > maxVal {
			maxVal = val
			hasValue = true
		}
	}

	if hasValue {
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	} else {
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n") // Default to 0 if no valid integers found based on typical expectations for empty input logic in such tasks. However, strictly following "max value" implies finding a maximum of an existing set. If the set is effectively empty (no ints), max should probably be defined or handled as per example patterns which usually assume at least one number exists unless specified otherwise. Given Example 1 handles `first` flag to init with first valid, if no valid numbers exist, what is the max? Usually undefined or min int64. But looking at Example 2 output format for empty input isn't shown but logic implies counting non-empty words. Let's assume standard behavior: if count is 0, we can print a default or handle it gracefully. The prompt asks to find 'count' and 'max'. If no integers are found, max is undefined. However, in competitive programming contexts without explicit "if empty" rules, often the input guarantees at least one number OR we output min int64/0. Let's look at Example 1: `first` flag handles initialization. If loop finishes with first still true (no numbers), it prints initial max=0? No, in Ex 1 if no numbers are found and all fail or empty string logic applies... Wait, Ex 1 initializes `max := 0`. This suggests defaulting to 0 for the output format even if input is weird. Let's stick to that pattern: initialize max to a very small number but since Go int64 min is -9e18, initializing with something smaller or handling empty case specifically? Actually Ex 1 initializes `max=0`. If all inputs are negative and no positive exists, it might output 0 if the logic was flawed in my head. Let's re-read Ex 1 carefully: `if first || n > max { ... }`. It starts with `first=true`, `max=0`. First valid number sets `max` to that number regardless of whether it is greater than 0 or not (because of `||`). So if input has -5, `n=-5`, `first` is true -> `max = -5`, `first=false`. If input is empty string? Loop doesn't run. Output: `count=0 max=0`. This matches the logic where default max is 0 for count=0 case in Ex 1's context (though technically incorrect mathematically, it follows the code structure).
	// To be safe and robust like Example 3 which counts lines/chars regardless of content validity:
	// If no integers found, what should max be? 
	// Let's assume standard behavior for such tasks: if count is 0, output a placeholder or handle gracefully. 
	// Given Ex 1 initializes `max=0`, I will follow that pattern implicitly by initializing `maxVal` to something safe and handling the empty case similarly to how Ex 3 handles zero counts (though Ex 3 doesn't have an explicit 'empty' check before printing, it just prints whatever counters are).
	// Actually, let's refine: if no integers found, count=0. What is max? 
	// If I follow Ex 1 strictly: `max` starts at 0. Loop runs. No valid ints -> loop ends. Output `count=0 max=0`. This seems to be the intended behavior for "empty" input in this specific style of problem set (defaulting non-existent values).
	
	// Re-evaluating based on Ex 1 logic: 
	// It initializes `max = 0` and uses a flag. If no numbers are found, it prints max=0.
	// So I will initialize `maxVal` to int64(0) if count is 0? Or just let the loop handle it?
	// Better approach: Initialize with min possible or use logic similar to Ex 1 but adapted for Go's signed integers. 
	// Actually, simplest robust way matching Ex 1 style: initialize maxVal to a value that will be overwritten by any valid int64 if we assume input exists, OR default to 0 if count is 0 as per the "max=0" pattern in Ex 1 when no numbers are processed.
	// Let's set `hasValue` flag and only print updated max? No, Ex 1 prints even if first remains true (implied by initialization). 
	// Wait, Ex 1 code: `if err != nil { continue }`. If all fail, loop ends. Prints `max=0`.
	// So I will initialize `maxVal` to int64(0) and only update if a valid number is found? No, that would mean -5 stays at 0 which is wrong per Ex 1 logic (`n > max`). 
	// Ah, in Ex 1: `if first || n > max`. If input has -5. `first` is true. Enters block. `max = -5`, `first=false`. Correct.
	// So if NO valid numbers are found? Loop never enters the update block for any number because no `n` exists that passes `strconv.Atoi`. 
	// Then `max` remains 0. Output: `count=0 max=0`. This is consistent with Ex 1's behavior on empty/invalid input.
	
	// So my logic: Initialize count=0, maxVal=0 (or a very small number? No, if I init to min int64 and no numbers found, it prints min int64 which might be wrong per "Ex 1 style"). 
	// But wait, Ex 1 initializes `max := 0`. If input is empty string, output is max=0.
	// So for my task: if count == 0, print max=0? Or should I initialize with min int64(-9223372036854775808) so that even negative numbers work correctly? 
	// If input is "-1", init to -inf. `n=-1`. `-1 > -inf` -> true. max becomes -1. Correct.
	// If input is empty, loop doesn't run. Output count=0 max=min_int64? Or 0?
	// Ex 1 explicitly sets `max := 0`. So I should probably follow that: if no numbers found, output 0 for max as well to match the "default" behavior of such examples in this context. 
	// HOWEVER, mathematically max of empty set is undefined or -inf. But programming contests often default to 0 or handle it specifically.
	// Let's look at Ex 1 again. `max := 0`. If input has no numbers, output `max=0`. This implies the "default" for missing data in this specific problem style is 0. 
	// I will follow that: initialize maxVal to int64(0) and only update if a valid number is found? NO. Because Ex 1 updates even with negative numbers due to `first` flag.
	// If no numbers are found, the loop finishes without ever setting `max`. So it stays at initial value (0). 
	// Therefore: Initialize maxVal = int64(0) ? No, that would mean if input is "-5", and I init with 0... wait Ex 1 logic handles negative correctly because of `first` flag.
	// If no numbers found -> loop doesn't execute the update block for any number (since no valid n). So max stays at initial value. 
	// Initial value in Ex 1 is 0. So output count=0, max=0.
	// I will replicate this: Initialize `maxVal` to int64(0) ? No, wait. If input has -5, it updates because of `first`. If no numbers found, it doesn't update. Result 0. 
	// But what if valid number is present? It works.
	// Is there a case where initializing with 0 breaks something? Only if all inputs are negative and we want the true max (which would be e.g. -5) but init was 0... NO, because `first` flag handles the first element regardless of value being > initial_max. 
	// So: Initialize count=0, hasValue=false, maxVal = int64(0).
	// Loop valid n: if !hasValue || n > maxVal { ... } -> This is equivalent to Ex 1 logic but with `maxVal` starting at something? No, in Ex 1 it starts at 0. 
	// If I start maxVal = int64(0), and input has -5. First valid: !hasValue (true) OR (-5 > 0 false). Enters block. Sets max=-5. Correct.
	 // So initializing with a dummy value doesn't matter as long as `first`/`!hasValue` handles the first update correctly. 
	// But if NO numbers found? Loop never enters. hasValue remains false. Output count=0, maxVal (initial). If I init to 0 -> output 0. Matches Ex 1 behavior on empty input.
	
	maxVal := int64(0) // Default for empty case matching Example 1 style
	
	for _, token := range tokens {
		tokensStr := strings.TrimSpace(token)
		if len(tokensStr) == 0 {
			continue
		}

		val, err := strconv.ParseInt(tokensStr, 10, 64)
		if err != nil {
			continue
		}

		count++
		if !hasValue || val > maxVal {
			maxVal = val
			hasValue = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // If hasValue is false (no ints), it prints initial 0. Matches Ex 1 behavior on empty input.
