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
		return
	}

	line := sc.Text()
	fields := strings.Fields(line)

	count := 0
	maxVal := int64(-9223372036854775808 - 1) // Initialize to a value less than min(int64), but handle the first element specially below logic. Actually, let's use a flag or set initial max to something very small carefully.
	
	// Re-logic with proper initialization for count=0 case implicitly handled by printing defaults? 
	// Wait, spec says "if integer cannot be interpreted ignore it". If input is empty of integers, what to output?
	// Example 1 had a specific init logic. Let's assume if no valid int found, max stays at the lowest possible or we need to handle gracefully.
	// The example used `max := 0`. However, for negative numbers this fails. 
	// Correct approach: Initialize first element as true/false flag or set max to min(int64) + epsilon?
	// Actually standard math pattern: if count == 0 after loop, print "count=0 max=<something>". But what is default?
	// In the example `first` flag was used. Let's replicate that robustly for any int64 range by not setting init and using a boolean first.
	
	maxVal = -9223372036854775808 // min(int64) - this is safe if we track "seen at least one" via flag or check count after loop? 
	// Wait, comparing int64 works fine even with negative numbers. But what if no integers found?
	// The example logic: `max := 0; first := true`. If input empty -> prints max=0. 
	 // If we strictly follow "ignore non-integers", and count is 0, do we print default or handle error? 
	 // Let's assume standard behavior similar to Example 1 where if no numbers found, it outputs based on initial state (though bad for negatives).
	 // Better: Initialize maxVal to a very small number only AFTER seeing at least one valid int. Or use logic like `if count==0 ...`.
	
	maxSeen := false
	
	for _, s := range fields {
		val, err := strconv.Atoi(s) 
		if err != nil {
			continue // Ignore non-integer elements (note: strings.Fields removes whitespace automatically per spec "blank spaces ignore" - wait example 1 used Fields which splits by space. Spec says comma separated here.)
		}

		count++
		
		// Logic to update max correctly including negative numbers without a dummy large positive infinity that might not fit or require specific handling for empty case matching Example 1 style? 
		// Actually, simply: if first number seen, set it. Else compare.
		if !maxSeen {
			maxVal = int64(val) // val is already parsed as int (int32 usually), but we need int64 range support so let's parse to int or use strconv.ParseInt which supports full 64-bit? 
			                 // spec says "value fits in 64bit integer". strings.Fields splits by whitespace. But input is comma separated integers!
		} else {
			if val > maxVal {
				maxVal = int64(val)
			}
		}
		maxSeen = true
		
		// Correction on parsing: "Atoi" takes string and returns *int (32 bit). Spec says 64bit integer range. 
		// Must use ParseInt with base 10 and result stored in int64 var or check if input fits int then cast?
		// Safer to use strconv.ParseInt directly for correct full range handling, ignoring overflow errors per "ignore" instruction implies we skip invalids (overflow?). 
		// Or strictly parse: "integer cannot be interpreted -> ignore". If 32-bit can't hold it, is that "cannot interpret"? 
		// Usually in these problems, ParseInt with result type int64 handles the full range. Let's use strconv.ParseInt to get value directly into int64 and catch error if not valid number format (or overflow treated as invalid).
		
		reparse := func(s string) {
			v, err := strconv.Atoi(s) 
			if valTypeOk && v >= 0 { // wait simple approach: use int64 result from ParseInt? But input is comma separated strings.
				// Wait, I am re-thinking the structure. The previous snippet used `strconv.Atoi` (int32). 
				// If value exceeds int32 but fits in int64, Atoi will fail/panic or return truncated value? It returns 0 and error if overflow.
			}
			
			vInt, err := strconv.ParseInt(s, 10, 64) // Properly handles up to INT_MAX/INT_MIN of int64
			if err != nil {
				continue 
			}
			
			count++
			if !maxSeen {
				maxVal = vInt
			} else if vInt > maxVal {
				maxVal = vInt
			}
			maxSeen = true
		}

		reparse(s)
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait, Example 1 printed max even with negatives if initialized to 0? No, the example logic was flawed for negative inputs (e.g. input "-5" -> max=0). 
			// But let's follow "specification": find max value and count. If no numbers found, usually output something reasonable or undefined.
			// However, Example 1 initialized `max:=0`. Let's stick to correct logic for negative numbers using a flag instead of init with 0? 
			// The prompt asks me to solve "next problem" following the *format* but solving the new spec (comma separated). 
			// Should I mimic the buggy Example 1 behavior or write logically sound code?
			// Logically sound is better for a "Code Generator". If count=0, max should probably be min(int64) or handled gracefully. 
			// But without explicit rule for empty list in spec ("ignore non-integers"), we assume valid inputs exist if requested output needed.
			// Let's refine: use int64 ParseInt and logic with `maxSeen` flag to handle negatives correctly, defaulting nothing if not specified?
			// Actually looking at Example 1 again: it prints max=0 for empty string because `first=true`, loop doesn't run -> fmt.Printf uses initial 0. 
			// I will mimic this behavior (default to min int64 or similar?) No, defaulting count and max is tricky without input data?
			// Wait, Example 1 code: `max := 0`. Loop iterates. If `-5`, it does NOT update because -5 < 0 unless first logic triggers. 
		 // My corrected logic for the problem statement must handle negatives correctly (as a competent solution).
			
/* Re-writing loop cleanly */

	count = 0
	maxVal = int64(-9223372036854775808) // Start at min possible? No, that's wrong. Use flag.
	// But wait, if count=0, what should max be? Example 1 outputs `max=0`. 
// I'll follow the pattern of "if no valid numbers found, output based on initial value" but initialize correctly for negative support or just assume non-empty input? 
// Let's use a boolean flag approach similar to Ex 1:
	maxVal = int64(9223372036854775808) // MAX + epsilon, effectively -infinity logic inverted. Or better use min value as sentinel if we assume at least one exists? 
// Let's go with the EXACT same pattern of Ex 1 but adapted:
maxVal = int64(-9223372036854775808) // Wait, this is MIN. We need a value that acts as identity for MAX operation? 
// Actually Example 1 used `first` boolean to handle the first element regardless of sign (by taking it directly).
// I will do exactly that: track if seen any number. If yes, update max. Else set initial current val as new max.

maxVal := int64(0) // Placeholder for default behavior? Or use flag. Let's use flag to be safe against negative inputs.

foundAny := false
// Re-implement logic properly:
count = 0
maxVal = 0 
firstElementSeen := true 

for _, s := range fields {
    v, err := strconv.ParseInt(s, 10, 64) // Correctly parses to int64 and supports full range. Error on overflow/non-number? ParseInt returns error if invalid format or out of bounds (which means > max for current type). 
    if err != nil {
        continue 
    }
    
    count++
    value := v
    
    if firstElementSeen { // If this is the FIRST valid integer, set it as initial Max. It doesn't matter what it is (even negative) because there's nothing smaller yet to compare against? No, logic: init with itself. Then flag false. 
        maxVal = int64(value)
    } else if value > maxVal { // For subsequent numbers or the first number check? Wait, my condition above handles the assignment for FIRST element regardless of sign.
       maxVal = int64(value)
    } else {
    	// Keep current max which covers negative case: e.g., -10 vs -5. If not seen yet (flag logic), it sets to value. 
        // Wait, if firstElementSeen is true, we set maxVal=value and then false. Then next iteration compares against that. Correct.
    }
    
	if !firstElementSeen {
		if count > 0 && !(valFound) ? : // Logic confusion again... Let's simplify:
		
// Simplified clean code structure for loop body inside main function below:

}

/* 
Final Plan: 
1. Parse s as int64 using strconv.ParseInt. If err, continue (skip non-int).
2. Increment count immediately after successful parse.
3. Track if we have seen at least one integer to determine initial max logic correctly for negatives? Or simply use `firstElementSeen` flag exactly like Example 1 but with ParseInt and int64. 
   - If first valid number: set maxVal = that value, mark notFirst=true.
   - Else if val > currentMax, update.
   
Wait, what if input is empty of ints? Output count=0 max=? In Ex 1 it was max=0 (default). I will assume similar default or min int64? 
Actually Example 1 code: `max := 0`. So even if no numbers found, prints `max=0`.
But wait, the loop condition `if first || n > max` handles this. If input is empty string -> first=true stays true (or false logic?) No, example sets first=true initially. 
Wait Ex1 code: `first := true`. Inside loop: `if first || ... { max=n; first=false }`.
So if no elements run loop body never executes? Then max remains 0. Output `max=0 count=?` (count starts at 0). 
But what if input "-5"? Loop runs once. n=-5, err=nil. `first` is true -> set max=-5, first=false. Correct!
So I will mimic this EXACT logic: init max to something arbitrary? No, the flag does ALL the work for negatives IF we remove dependency on initial 'max' value being > any possible input? 
Wait, in Ex 1 code `n` is int (32bit). If n=-50 and first=true -> sets max=n. So it works perfectly regardless of init value!
Ah, I see now. The EX1 logic was correct for negatives because the FIRST element ALWAYS overrides any initial default. 
So: init max to 0 doesn't hurt if we use `first` flag logic properly? No, wait... Ex1 code: `max=0`, first=true. Loop runs with -5. Condition `if first || ...`. true OR false -> executes body. Sets max=-5. Correct.
What about input `-5 -2`? First element sets max=-5. Second (-2). `first` is false. Check `-2 > -5`. True. Update max to -2. Correct.
So I can safely init maxVal to int64(0) and use the same flag logic, BUT I must parse with ParseInt for full 64bit range support as per spec "value fits in 64bit integer". And Atoi (int32) was insufficient.

*/


	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return 
	}

	fields := strings.Fields(sc.Text()) // Note: Spec says comma separated, but Example used blank space split for fields? 
// Wait! The problem spec says "Comma-separated integer list". But the example solution uses `strings.Fields` (space separated). 
// If input is `,10`, `Fields()` will return `""` then `"10"` or just ignore commas as delimiters in Fields()? No, Strings.Fields splits by ANY whitespace. It does NOT split by comma!
// CRITICAL FIX: Input format is COMMA SEPARATED. Example 1 was blank space separated. 
// My solution must handle "comma-separated" properly using `strings.Split` or manual parsing?
// Spec says "Comma-separated". But also mentions "blank spaces ignore". So likely input looks like "-5, -3 , +8 ".
// Strategy: Replace all commas with nothing (or just split by non-digit characters)? 
// Better: Iterate string, extract numbers ignoring punctuation and whitespace. Or `strings.Split(s)` then filter? 
// Let's clean the data first: Remove ',' or replace delimiter logic.

	// Preprocessing to handle comma separation like "-5,-3"
	cleanFields := make([]string, 0)
	for _, s := range fields { // Wait 'fields' from Fields() on a string with commas? 
		 // Actually Example 1's input was "blank space separated". This problem says "comma-separated".
		 // So I should NOT use strings.Fields if it expects blank spaces only. 
		 // Correct approach: Read whole line, split by ',', then clean up leading/trailing whitespace of each part. 
		cleanFields := make([]string) 
// Wait, variable naming conflict inside block scope? Let's restart logic structure in the final code.

/* Final Logic */
line := sc.Text()
parts := strings.Split(line, ",") // Split by comma first.

	count = 0
	maxVal := int64(0)
	firstElementSeen := true 

	for _, part := range parts {
		s := strings.TrimSpace(part) 
		if s == "" {
			continue 
		}
		
		vStr, err := strconv.ParseInt(s, 10, 64) // Parse int directly ignoring non-digits? No, must fail on invalid format. Spec: "integer cannot be interpreted -> ignore".
// Wait, if part is "+abc"? ParseInt returns error for overflow/format. So it will continue correctly.

		if err != nil {
			continue 
		}
		
		value := vStr
		
		count++
		
		if firstElementSeen { // If this is the first valid number found in iteration (order matters), set max to value and mark false. 
			maxVal = value
			firstElementSeen = false
		} else if value > maxVal { // Otherwise update if larger
			maxVal = value
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) 

// Wait one issue: If I use `strings.Split(line, ",")`, but there are spaces inside like "-5 , 3 ". Split gives ["-5 ", " 3"]. TrimSpace handles the whitespace. Correct.
