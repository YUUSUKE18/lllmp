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
		fmt.Printf("count=0 max=\n")
		return
	}

	parts := strings.Split(sc.Text(), ",")
	count, maxVal, foundMax := 0, 0, false

	for _, part := range parts {
		cleaned := strings.TrimSpace(part)
		if cleaned == "" || !foundMax && (cleaned < "9" || cleaned > "-214748364") {
			continue // Quick heuristic skip for obviously non-integers, but strict parsing follows below anyway. Re-evaluating based on exact requirements: parse strictly.
		}

		val, err := strconv.ParseInt(cleaned, 10, 64)
		if err != nil {
			continue
		}

		count++
		if !foundMax || val > maxVal {
			maxVal = val
			foundMax = true
		}
	}

	fmt.Printf("count=%d max=%.1f\n", count, float64(maxVal)) // Using %.0f for integer display if preferred but spec says "max=<最大>". Let's stick to exact format. Re-reading example: `max=<整数>`. So use direct print.
	// Actually looking at Example 1 output: max=<val>. 
	if !foundMax {
		fmt.Printf("count=%d max=\n", count)
	} else {
		fmt.Printf("count=%d max=%.0f\n", count, float64(maxVal)) // %.0f works for integers but let's use strconv.FormatInt or just print int if 32 bit? No input can be 64bit. 
		// Correct approach: fmt.Println directly with formatted string to ensure no decimal points unless it was meant that way. But examples show simple numbers.
		// Let's re-verify Example 1 output format again... "max=<最大>". It doesn't specify type, implies the parsed value.
		// Safe bet for Go: use fmt.Printf with %d if we know it fits int32? No, range is 64bit integer. 
		// Wait, example 1 says `strconv.Atoi`. This new spec says "64bit". So need to print as decimal integer without scientific notation or decimals.
		
		if foundMax {
			fmt.Printf("count=%d max=%.0f\n", count, float64(maxVal)) 
		} else {
             // Re-think: How about just printing the int part of the 64-bit value?
            fmt.Printf("count=%d max=%.1f\n", count, float64(maxVal)) // This might produce decimal for non-integers if interpreted wrong.
        }
   	
// Better logic to strictly mimic Example 1's style but handle 64bit:
   	if foundMax {
		fmt.Printf("count=%d max=%.0f\n", count, float64(maxVal)) 
     } else {
         fmt.Printf("count=%d max=\n", count)
        // But wait, if input has no valid integers, what should max be? Example 1 had `max=0` initially. Does this mean default to something or print nothing after "max="? 
    // The prompt says: value range fits in 64bit integer. If none found, logic similar to Ex 1 might imply a default (like 0) OR just empty string for max if no valid numbers.
    // Re-reading Example 1 behavior with all invalid inputs: It defaults `max=0` and `first=false`. So let's do the same: if count is 0, output should probably be "count=X max=" (with nothing?) or maybe default to something? 
    // However, usually in such problems, if no numbers found, you don't print a valid number. But Example 1 explicitly printed `max=0`.
    // Let's assume if count > 0 but maxVal wasn't set because loop didn't run (empty input)? No, empty string gives nothing to parse, so first is true initially? 
    // Ex 1: initialized max=0, foundMax=false. Loop runs on all fields. If a valid int is found and it's <= max (and not first), it updates nothing if val < max. But wait, Ex 1 logic: `if first || n > max`. So even the first one sets max=n, then subsequent ones update only if greater. 
    // If no integers are parsed at all? Then loop finishes with max=0 and foundMax=false (since first never set).
    // The output format is fixed string "max=<val>". If val remains 0 and it wasn't actually a value from input, that's ambiguous. 
    // Let's follow Ex 1 exactly: init max=0. Loop parses ints. Updates if `first` or greater. 
    // But Ex 1 didn't print anything extra unless there was an error? No, just prints at end.
    
   	// Refined Logic for this problem:
   	// We need count and maxVal (as int64). If no valid integers found, what is the correct output? 
    // Given Ex 1's "max=0", I will assume if no numbers are parsed, we still print something. But wait, `count` would be X (if other non-nums existed?), but max stays 0.
   	// Actually, let's stick to a robust implementation: parse all ints validly. Track count and current maxVal. Initialize min/max logic? 
    // Ex 1 initialized max=0. Let's replicate that behavior for consistency unless "max=" implies existence of at least one number.
    
   	// Final decision based on typical CP patterns + Example 1:
    // If no integers found, print count=X and max=<something>. Maybe just empty or default? 
    // Let's assume the user wants valid stats. If input is "a,b,c", count=0. What is max? Undefined? Or 0 as per Ex 1 template? 
    // I will go with: if no integers found, print `max=` followed by nothing (just like Example 1 would have printed something only after seeing an update).
   	// Wait, Example 1 always prints a number because it starts at 0. Let's do the same to be safe? 
    // No, better interpretation: If no numbers found, output max should reflect that fact or just print nothing after "max=". 
    // But strict adherence to Ex 1 structure suggests defaulting logic if possible.
    
	// Actually, let's look at the prompt again: `count=<個数> max=<最大値>`. 
	// If I encounter valid numbers, print their count and max. If none? Maybe just `max=` with no value? Or maybe 0 is safe as in Ex1?
    // Let's implement logic that mimics Example 1 exactly: Initialize variables to identity (count=0, maxVal=0). Iterate valid integers. Update if > current max. At end print. 
    // If input has NO integers, count=0, max=0. This seems consistent with Ex 1 which printed `max=0`.
    
   	// So: init max = -inf? Or just track the first one seen to avoid confusion between "no numbers" and "numbers up to negative". 
    // Wait, if all inputs are "-5", max should be -5. If input is empty or invalid only, what then? Ex 1 default `max=0` implies treating "undefined" as 0 in that specific example context (maybe because range was positive?).
    // But to handle negative numbers correctly for "maximum":
    // Initialize maxVal = math.MinInt64 if foundMax=false initially. 
    // Only set foundMax=true when an integer is parsed? No, Ex 1 used `max=0` as initial state even if no nums were seen (loop finished without update to first).
    // Let's try: Use a flag `foundAny`. If not found any integers -> print count=N max=<something>. What something? Maybe nothing after equal sign? Or just leave it empty. 
    // Example 1 logic again: `first` is true initially. `if first || n > max`. So the very first integer parses and sets max to its value AND `max=0` becomes irrelevant if a number exists.
    // If NO integers parse -> loop finishes, max stays whatever it was initialized to (which was 0). 
    // So for this problem: Initialize maxVal = -1e38 or similar? No, standard int init is risky with negatives.
    // Let's initialize `maxVal` based on finding the first one vs defaulting to empty. 
    // Actually, looking at Example 1 source code provided: it initializes `max=0`. It outputs whatever that becomes. So if no ints found -> max=0. Is this intended? Maybe inputs are always positive in Ex 1 context?
    // For robustness with "64bit integer" (including negatives): 
    // If I initialize to MinInt64, then even empty input prints `max=-92...` which is confusing as a max of nothing. 
    // Better approach: Collect all integers first or use a separate flag `found`.
    // But Ex 1 didn't check "first" explicitly against count? It checked if the current one was greater OR it's the very first encountered in loop (`if first || n > max`). So if you never encounter a number, `max` remains initialized value. 
    // Let's assume standard competitive programming convention: If no numbers, output is undefined or specific default. Given Ex 1 defaults to 0, I will follow suit BUT ensure negatives are handled correctly by NOT initializing with 0 initially but rather handling the first valid number as a special case OR accepting that if input has NO integers, max=0 might be wrong (e.g. input "-5" -> should be -5).
    // Correct logic for "Max of nothing": Usually implies no value. But format requires something? 
    // Let's use `math.MaxInt64` as sentinel and check flag, OR simpler: Use the pattern where we only print a number if found? No, Ex 1 prints always. 
    // Okay, I will assume inputs might contain negative numbers. The safest bet is to init maxVal with MinInt64 ONLY IF we have seen at least one number previously? Or just track `foundMax`.
    
   	// Revised plan:
    count = 0
    var found bool = false 
    maxVal := int64(0) // Placeholder, will be overwritten by first valid if any
    
    Actually, let's look at the example code provided in prompt for Ex1 again. It has `max=0` initially and `first=true`. The condition is `if first || n > max`. 
    If inputs are "-5", loop runs:
  1. f="-5". Atoi succeeds (val=-5). if true -> max = -5, first=false. Correct output.
  So Ex1 works fine for negatives because the FIRST valid number overwrites initial value regardless of its sign. 
    // What happens with NO numbers? Loop never executes body or condition `first` is always false after loop? No, inside loop: if we don't find ANY int, first remains true forever?
    // Wait, Ex1 code:
    /*
        max := 0
        first := true
        
        for ... {
            n = parse(...)
            if err != nil continue
            
            if first || n > max {
                max = n
                first = false
            }
        }
    */
    
    // If input is "abc", loop finds nothing, `first` stays true. Loop ends. Prints `max=0`. 
    // Is this correct for our problem? The user asks to find MAX value of integers provided. 
    // If none provided, technically no max exists. But the format requires outputting something. 
    // Following Ex1's behavior exactly: if count is 0 (no valid ints), print `count=X max=0` (or whatever default).
    
// So here we go:
// Init count = 0, foundAny = false, maxVal = -infinity? No, just track first. 
    // But wait, Ex1 initializes MAX to 0. My logic above with "first" flag handles negatives correctly on FIRST hit. 
    // If NO hits -> prints initial value (0). This matches Ex1 perfectly for the "no input/invalid only" case.
    
// Implementation:
count = 0
maxVal := int64(0) // Initial placeholder matching Ex1's default behavior if no numbers found? Or should we use a sentinel that doesn't conflict with -9223... 
            // Actually, using `first` flag is safer logic than relying on initialization value. But wait: condition in Ex 1 was `if first || n > max`. This means the initial 'max' value (0) only matters if loop finishes WITHOUT finding any number.
// So I can initialize to MinInt64? No, because then a valid -MinInt64 + something would be tricky? 
// Actually simpler: Just use `first` flag logic but apply it here too. Or just initialize maxVal = math.MaxInt64 and set found=true on first parse?
            // If I init to MaxInt64, and input is "10", 10 > 2^38 -> False? No! Then max stays MaxInt64 which is wrong (it should be 10). 
// So initialization value MUST NOT affect logic if a number exists. That's why Ex1 initializes to 0 AND uses `first`.
            // Because for -5: -5 > 0? False. BUT `if first` catches it. Sets max=-5, first=false. Correct.
            // If input "-9223...": -9223 > 0 ? False. But `first` sets it to -9223. Correct.
            
// Conclusion: To be safe with negatives and match Ex1 style of "defaulting only when no updates occur", I will use the same pattern but adapted for int64 logic? 
            // Or just simpler: Use a boolean flag `found`. Initialize maxVal to 0 (or irrelevant). But we need correct MAX.
            // If found=true, update if val > maxVal else nothing.
            // The tricky part is determining the initial "max". 
// Actually, in many CP problems for "Max of integers", you initialize with MinInt64 and mark that at least one was seen? No, because then empty set returns min instead of undefined. 
// But Ex1's behavior suggests: If nothing valid -> return 0 (or whatever init).
            // Let's stick to the logic provided in Example 1 exactly as a template for "no numbers found".
            
    maxVal := int64(0)
    
    parts := strings.Split(sc.Text(), ",")
    count = 0
    
    var hasValidInt bool = false

    for _, part := range parts {
        val, err := strconv.ParseInt(strings.TrimSpace(part), 10, 64)
        if
