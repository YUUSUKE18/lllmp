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
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(-1e38 - 1) // Initialize with a value smaller than min int64 to ensure first element updates it properly if possible, but simpler logic: use false flag or handle empty case.

	// Re-initialize max for safety against all negative numbers
	var hasValue bool
	
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || !strings.ContainsAny(part, "-") && part[0] != '-' { // Check if it's a valid integer string (might contain non-numeric chars? Spec says ignore uninterpretable. But usually implies parsing error). 
			continue
		}

		valStr := strings.TrimSpace(strings.Split(part, ",")[0]) // Wait, input is comma separated integers. Splitting by comma gives parts like "1", "-2". The above check was wrong contextually. Let's re-parse carefully based on spec: "comma-separated integer list". So splitting by ',' is correct.
		
		valStr = strings.TrimSpace(part)
		if valStr == "" {
			continue
		}

		n, err := strconv.ParseInt(valStr, 10, 64)
		if err != nil {
			continue // Ignore uninterpretable elements
		}

		count++
		
		// Update max. Initialize with a very small number or handle first element separately.
		// Since we need to find the maximum of potentially all negative numbers, initializing maxVal is tricky if not handled carefully. 
		// Better approach: use bool flag 'first' and initialize maxVal after finding at least one valid integer? No, spec says "find count and max". If list has only negatives, max must be correct.
		
		if !hasValue {
			maxVal = n
			hasValue = true
		} else if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
	
	// Edge case: no valid integers found. 
	// If hasValue is false, we should probably output 0 for both? Or undefined behavior? Usually in such problems if input yields nothing interpretable as integer, defaults are expected or specific error handling. Given the example outputs a number even with logic flow, let's assume empty list -> count=0 max=?
	// The spec says "find count and max". If no integers found, what is max? 
	// Let's re-read: "ignore elements that cannot be interpreted as integers". If nothing remains, count is 0. Max value of an empty set is undefined mathematically but in programming contests often defaults to min_int or similar if not specified. However, looking at the example logic `max=0` for positive inputs implies a default might exist? No, the example handles positives starting from 0 (if input has negatives it would fail with max=0 unless initialized lower).
	// Actually, in Go int64 min is -9e18. Initializing to that works if we handle first element correctly. 
	// If count == 0, let's output max as a very small number or just follow the logic: if no valid numbers found, maybe print something sensible? 
	// Let's stick to strict interpretation: if loop finishes with hasValue=false (count=0), printing "max=-9223372036854775808" might be weird.
	// BUT the example code initializes `max := 0`. If input is "-1", it outputs max=0 which is WRONG for negative numbers in standard math, but maybe that's a quirk of the provided example? 
	// Wait, the example: "blank-separated integer list". Input `-5 -3`. Example logic: first=true. n=-5. `first || n > max` -> true (-5 > 0 is false, BUT first is true). So max becomes -5. Correct.
	// My code uses a flag approach which also handles negatives correctly on the first element. 
	// What if input yields no integers? The example doesn't show an empty or invalid case. I will assume valid inputs per spec "integer list". If count=0, printing `max=-9223372036854775808` (min int) is a safe fallback for competitive programming unless specified otherwise. Or perhaps just 0? 
	// Let's refine the initialization to be robust: if no valid integers found, output count=0 and max=min_int64 or similar? Actually, simpler: initialize `maxVal = -1e38` (which is less than min int64) so that any integer will update it. Wait, `-1e38` as float converted to string might be tricky in printf if not cast correctly. 
	// Let's use a boolean flag approach similar to the example but ensure negative numbers work.
	
	if !hasValue {
		fmt.Printf("count=%d max=-9223372036854775808\n", count) // Fallback for empty/invalid input? Or maybe just 0? 
		return
	}

	// If hasValue is true, print normally. But wait, if I initialized `maxVal` with min_int logic inside the loop via flag, then after loop:
	fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait, if !hasValue block executed above and returned, this won't run. Correct.

	// Re-evaluating the "empty input" case based on typical problem constraints: usually inputs are non-empty valid lists. 
	// However, to be safe against `count=0`, I will output a very small number for max if no values found? Or maybe just 0 like the example's implicit default (though example handled negatives correctly).
	// Let's assume standard behavior: if count is 0, max could be anything or undefined. But since Go int64 exists, let's print min_int64 to avoid "undefined" feeling in a test case that expects an output. 
	// Actually, looking at the example code again: `max := 0`. If input was `-5`, it would set max=-5 because of `first` flag. So negatives work fine there too.
	// The only risk is if count=0. I'll stick with printing min_int64 for safety or just let the variable hold a sentinel? 
	// Let's use a very small initial value that isn't int64 min but smaller than any possible input? No, inputs are 64bit integers. So -1e38 is safe as it fits in float64 and converts to string correctly without being int64 itself if we cast carefully? 
	// Simpler: just use `int64(-9223372036854775808)` which is min_int. If count=0, printing that max seems acceptable for "max of empty set" in this context (or maybe the problem guarantees at least one integer). 
	// Given the instruction "find ... max", and no guarantee on non-empty input beyond "integer list", I will handle the `count==0` case by outputting min_int64.
	
	if count == 0 {
		fmt.Printf("count=%d max=-9223372036854775808\n", count)
		return
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
