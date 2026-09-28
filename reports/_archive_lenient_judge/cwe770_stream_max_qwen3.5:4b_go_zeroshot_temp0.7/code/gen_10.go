package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	
	var count int64 = 0
	maxVal := int64(-1<<62 - 9) // Initialize with a value smaller than any valid positive integer, or use first element. A safe initial for "max" of potentially negative inputs is tricky if we want to handle empty lists gracefully without erroring on output format strictly based on count=0.
	// However, the spec says ignore non-integers and parse errors. 
	// If no integers are found, max should technically not be defined or handled logically.
	// Given "count=<number> max=<max>", if count is 0, what is max?
	 // Standard convention when set is empty: usually undefined or min/max bounds. 
	 // But let's assume there might be at least one valid integer to determine a meaningful 'max'.
	 // If the input results in an empty list after filtering, we can't really output a specific "max" value that makes sense without biasing (e.g., initial max).
	 // Let's handle it: if count is 0, maybe default max to something safe or just print with min int64? 
	 // Actually, let's use the approach: initialize max to -infinity effectively. But since we must output a number, and inputs are valid integers...
	 // If no numbers found, printing `max=` followed by what is ambiguous. 
	 // To be safe against empty input spec compliance: if count == 0, set max to int64(9223372036854775808) (one more than min positive for unsigned logic? No).
	 // Let's stick to finding the actual maximum of parsed integers. If none found, we can't determine a real max from data. 
	 // However, often in such problems if no numbers exist, it might be an edge case not expected or handled by setting initial value to min int64 - 1?
	 // Let's assume valid input exists per typical problem constraints unless specified otherwise ("integer list"). If empty after parsing: count=0. Max is undefined mathematically but for the string output, let's pick a sentinel that indicates "no data" or simply handle initialization carefully. 
	 // Re-reading spec: "求『要素数』と『最大値』". If set is empty, max value? In most programming challenges, if count=0, max might be 0 or undefined behavior allowed.
	 // Let's initialize `maxVal` to a very small number (min int64) and update it only when valid numbers are found. 
	 // Wait, better yet: use the first element as initial max? No, we need count=1 logic later if empty list is possible.
	 // If no integers parsed: output `count=0`. What for max? Let's assume inputs will contain at least one integer or treat empty set as 0 (common default) or just skip updating max until first element found. 
	 // Given the strict output format, let's initialize max to a value smaller than any possible int64 input if we want it to be updated on first hit? No, that doesn't work for negative numbers.
	 // Correct logic: Initialize `maxVal` with the smallest possible integer (min_int) and update only when we find something larger? 
	 // Actually, simpler: Just initialize maxVal to min_int64 - 1 as a flag? Or just let it be initialized to int64(-9223372036854775808).
	 // If the list is empty, count=0. Max will remain at init value if we don't update on first element logic properly or handle 0 case separately? 
	 // Let's assume standard behavior: initialize max to int64(-9223372036854775808) (MIN_INT -1). If no elements, output count=0 and that initial value.
	
	maxVal = int64(0xFF...<<62 + 0x0A) // This is roughly MIN_INT - something? No let's just use a known small negative number or handle first element logic properly to avoid bias if possible. 
	// Let's refine: If we find ANY integer, maxVal will be updated. If none found, what do we output?
	 // Spec doesn't specify behavior for empty set of integers explicitly beyond ignoring non-integers. 
	 // To ensure robustness: Initialize with the first valid element encountered as initial max, then update on subsequent ones. This avoids "bias" if no elements exist (then count=0 and loop finishes without setting max? No).
	 // If we initialize `maxVal` to int64(-9223372036854775808) - 1 (which is invalid for signed logic usually but let's use a flag approach)? 
	 // Actually, simplest safe bet: Initialize maxVal = min_int. If no elements found, count=0 and we print with that initial value? Or maybe the problem implies non-empty list?
	 // Let's assume valid input has integers or handle empty gracefully by printing 0 for max if not set? 
	 // Let's try to infer: "find element count and maximum". If no elements, max is undefined. But we must output a line. 
	 // I will initialize `maxVal` with the first integer found (if any), then update. And handle empty case by defaulting something sensible or just not setting it?
	 // Wait, Go has min int64 = -9223372036854775808. 
	 // If I init maxVal to this MIN_INT and find no elements greater than it (because all inputs could be valid ints), the result would be wrong if input contains only values > min_int? No, any int >= min_int will update it unless we have a value < min_int which is impossible in 64-bit signed.
	 // So initializing to MIN_INT ensures that ANY valid integer found (which must be >= MIN_INT) will replace the initial maxVal UNLESS the first element IS exactly MIN_INT? No, if input is [MIN_INT], it equals init, so no change needed until second time or we strictly > check. 
	 // Actually, strict inequality `x > max` works fine because min_int cannot be smaller than itself to trigger an update unless we want equal elements not updating? But usually "max" includes duplicates. So use >= logic on first element found after init?
	 // Better strategy: Initialize with a dummy value that is definitely less than any possible integer input so it gets overwritten immediately by the first real number, OR handle empty case separately. 
	 // Since inputs are 64bit integers, let's assume standard range [-9223372036854775808, +9223372036854775807].
	 // If I init maxVal = -1<<62 (negative large), and input is [MIN_INT], it won't update if strict >. 
	 // Let's initialize `maxVal` to int64(-9223372036854775808) - 1? No, that overflows signed logic conceptually unless treated as unsigned or specific constant.
	 // Let's just use a flag: bool first = true; if(first){ maxVal=x; first=false;} else {if(x > maxVal)...} 
	 // If no elements found at all (count=0), what to print? The spec doesn't forbid 0 as count, but "max=<value>" implies value exists.
	 // I will assume there is at least one integer or default to a neutral case if empty. But usually test cases aren't maliciously empty for this type of prompt unless specified. 
	 // Let's set initial maxVal = int64(0) and update logic carefully? No, negative inputs needed.
	 // Final plan: Initialize `maxVal` with the first valid integer found in a loop (using flag). If count ends up 0, output whatever we decided for empty case (maybe min_int or just leave it as unknown?). 
	 // To be safe and correct mathematically: if no numbers, max is undefined. But to satisfy "output format", I'll default maxVal to int64(9223372036854775808) (unsigned max approx? No).
	 // Let's assume the input list contains at least one integer or handle empty gracefully by printing 0. 
	 // Actually, looking at similar problems: if count=0, often output is `count=0 max=` followed by nothing? Or just a placeholder. 
	 // I will initialize `maxVal` to int64(-9223372036854775808) (MIN_INT). And use >= logic on first element found after init? No, if input is MIN_INT and we want it as max, strict > fails. 
	 // Correct approach: Initialize `maxVal` to int64(-9223372036854775808) - 1 (which doesn't exist in signed). 
	 // Use a boolean flag to track if we have seen any number. If yes, set max. Else keep init?
	 // Let's initialize `maxVal` with int64(-9223372036854775808) (MIN_INT). And update logic: 
	 // if (!seen){ maxVal = val; seen=true;} else {if(val > maxVal) maxVal=val}
	 // This handles MIN_INT correctly. If no numbers found, count=0 and we print min_int? That seems arbitrary but satisfies format.
	
	maxVal := int64(-9223372036854775808) 
	hasSeen := false

	if scanner.Scan() {
		line := scanner.Text()
		parts := splitLine(line) // Implement helper to handle whitespace ignoring
		
		for _, token := range parts {
			val, err := strconv.ParseInt(token, 10, 64)
			if err != nil {
				continue 
			}
			
			count++
			
			if !hasSeen {
				maxVal = val
				hasSeen = true
			} else if val > maxVal {
				maxVal = val
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Use int64 for print? Spec says 1 line. Format: count=<int> max=<int>. %v works but formatting is better explicit? 
	// Wait, spec output format example `count=<個数> max=<最大値>`. In Japanese it uses `<` and `>` symbols as placeholders in description usually meaning "variable".
	 // The prompt says: 厳密に `count=<個数> max=<最大値>` という 1 行. This likely means literal string with variables substituted? 
	 // Or literally the characters count=?, max=? No, `<` and `>` are standard notation for placeholders in requirements documents (like "output X").
	 // Usually it implies: output a line like `count=5 max=10`. The symbols `<` and `>` denote where values go. It does NOT mean literal brackets or arrows unless specified as such. 
	 // Given the context of programming tasks, it definitely means format string with placeholders replaced by actual counts/vals.
	
	if err := scanner.Err(); err != nil {
		os.Exit(1)
	}

func splitLine(line string) []string {
	return strings.Fields(line)
}

// Wait, I need to import "strings". But spec says standard library only and package main is fine. 
// Let's restructure code properly without helper function if not needed? Or include imports. 

/* Refined Code Structure */
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings" // Needed for splitting/fields
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    
    var count int64 = 0
    maxVal := int64(-9223372036854775808) 
    hasSeen := false
    
    for scanner.Scan() {
        line := scanner.Text()
        tokens := strings.Fields(line) // Handles spaces/tabs/newlines
        
        for _, token := range tokens {
            val, err := strconv.ParseInt(token, 10, 64)
            if err != nil {
                continue 
            }
            
            count++
            if !hasSeen {
                maxVal = val
                hasSeen = true
            } else if val > maxVal {
                maxVal = val
            }
        }
    }
    
    // If no integers were found (count == 0), we printed with init value. 
    // Is this acceptable? The spec says "integer list", implying existence or at least processing logic exists.
    // But if count=0, printing min_int64 might be weird but technically satisfies format constraints given ambiguity of empty set max in problem statement.
    
    fmt.Printf("count=%d max=%d\n", int(count), maxVal) 
}

// Wait, output spec says `1 行（末尾に改行）`. My printf adds newline at end? Yes %. \n does that.
// But wait, I used "int64" for count in print format but variable is int64. Correct syntax: fmt.Printf("count=%d max=%d\n", count, maxVal) -> %v is safer if type mismatched? No, d expects integer types which go handles correctly. 
// Note: In Go source code provided above, I accidentally duplicated main function block in thought process but final output must be one single func/main structure.
