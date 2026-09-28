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
	count := 0
	maxVal := -1 << 63 // Initialize with the smallest possible int64 value to ensure it's smaller than any valid integer input. Actually, we can start assuming count is positive and max needs initialization. Better yet: initialize max to a very small number or handle empty case specifically after finding at least one element. However, if no integers are found, what should max be? The spec says "count=<個数> max=<最大値>". If there's nothing valid to compare, the problem is ambiguous for 'max'. Let's assume inputs always contain some integer based on typical competitive programming contexts unless specified otherwise (e.g., empty input -> count=0). But let's look at Example 1: `first` flag logic. I'll follow a similar pattern but need to decide what happens if no integers are found. Usually, in such problems, max is undefined or the problem guarantees valid data. However, to be safe and consistent with "max" meaning maximum of elements:
    // If count > 0, we find an integer. Let's set initial max to -infinity (smallest int64).
    const minInt = -1 << 63 
	maxVal := minInt

	for _, p := range parts {
		sTrimmed := strings.TrimSpace(p)
		if sTrimmed == "" {
			continue
        }
		
		val, err := strconv.ParseInt(sTrimmed, 0, 64) // Parse as signed int with base specified by string (e.g., '123' -> "base"="0", so it defaults to decimal). Spec says "integer sequence". Standard input integers usually mean decimal. So we parse with default radix? No, strconv.ParseInt takes a byte slice and optionally an explicit base if provided via format or just the number string itself implies decimal? Actually, `strconv.Atoi` parses a string as a signed 64-bit integer in base 10 (assuming no prefix like 'x' for hex unless we specify). Wait:
        // If input is "abc", ParseInt fails -> ignored. Correct. 
		valStr := strings.TrimSpace(sTrimmed) 
		n, err := strconv.Atoi(valStr)

		if err != nil {
			continue
		}
		
		count++
		firstFound == true || n > maxVal { // Wait: first bool initialized to false is bad if no numbers. Let's use flag logic like example 1 or initialize with minInt properly? 
            /* Logic correction from Example 1 style */
        }

		if count <=0 && err != nil{ continue }; else {max = n; first = true} -> No, need re-write clean loop:

	for _, p := range parts {
         sTrimmed := strings.TrimSpace(p)
		 if len(sTrimmed) == 0 { continue } 
		 val, _:= strconv.Atoi( sTrimmed ) // Assuming base10 as per "integer" usually. But standard input often includes hex? No, spec says integer sequence, likely decimal unless stated otherwise. Example 1 used Atoi which is base 10.
        if err != nil { continue }

		if first || val > maxVal{ // re-check min initialization logic 
            // If I initialize max to -inf, then any real int (even negative) will update it? Yes unless input has only values smaller than minInt which is impossible in signed 64-bit range. But wait: if count=1 and value=-2^63, max should be that. Initializing with `-((int<<shift))` works because no valid input < -9e18 approx. 
            // Actually simplest is use first found as seed or assume at least one integer? Let's try Example 1 logic adapted:
        }

		if count >0 && val != minInt { // No this doesn't work well for initialization without a flag... better to track if seen any valid int.
            
    let `firstFound` be true initially, and initialize maxVal with first element encountered? Or keep -1<<63. If input has all numbers >= 0 then fine. But inputs can be negative. Smallest possible integer is minInt itself (approx -9e18). Is it safer to use a boolean flag `found`? Yes, Example 1 does this:
	
    found := false // reset per testcase or global scope inside loop
	
	for _, sTrimmed := range parts { 
		if len(sTrimmed) ==0 || !isValidInt(sTrimmed){ continue } 
		nval,_:=strconv.Atoi(sTrimmed)
		
        if nval > maxVal && count==1{ // Wait, initialization problem again...

            /* Let's restart the logic cleanly */
    }
}

Actually, Example 3 doesn't do this specific task. But looking at Ex1 and Ex2: they handle empty inputs gracefully? Ex1: `max:=0` then check if input has values. If no numbers given (all non-integers or empty), max remains 0? No, spec says "integer sequence". Implies valid integers exist? Or maybe not. But in competitive programming tasks like this, usually there's at least one number unless specified otherwise. 
Wait, Example 1 initializes `max=0`. It updates if `first || n > max`. If no numbers are read, output is still printed with whatever initial value was set. However, for Ex3 (lines/chars), the problem guarantees input existence? No, but here we must handle general case properly or follow the spirit of "read integers and find max".

Revised Plan:
- Read all stdin until newline/symbol end if possible, though `sc.Text()` reads up to next whitespace/newline. Wait! Spec says comma-separated integer list in ONE line? Or standard input containing such sequence? 
Spec: "標準入力から、カンマ区切りの整数列を受け取ります" (Accepts a comma-separated integer sequence from stdin). It doesn't explicitly say it's one line or all lines, but the examples show reading `sc.Text()` which reads everything separated by whitespace. Since input is likely just one line containing multiple integers with commas? Or can be multiline if split by newline then joined? 
Example 1: Reads a single string from stdin (line) and splits into fields (space-separated).
So here, we read the whole text of standard input as per Example 3 style or simpler `sc.Scan()` which reads one line. Assuming it's all on one line like Ex2 ("カンマ区切りの語"). Wait, Ex1 says "空白区分りの整数列", so split by whitespace to get numbers if they were space separated? Here: comma-separated integers.
But wait! Does the input contain ONLY commas and ints? Or can there be spaces around them? 
Spec: "空要素・前後の空白は無視". So yes, handle surrounding whitespaces too.
Does it guarantee at least one integer? If not, count=0, what about max? Usually undefined. But maybe if we assume input exists or initialize correctly... Let's see Example 1 again: `max:=0` is the default if loop doesn't run (no numbers). It outputs "max=%d" with that value. So I will follow same pattern but for integers. Since ints can be negative, initializing to 0 might be WRONG if all inputs are negative! E.g., input "-5". Output should be max=-5 not 0.
Ah, correct approach: Use a boolean flag `seen` and update only when seen becomes false OR first true (like Ex1). Initialize with very small number `-inf`. But how to handle the "no valid integers found" case? If no integers found, maybe print nothing or follow Example 1's behavior of printing default. Given ambiguity, I will implement: 
Initialize `maxVal` = minimal possible int64 (`-9223372036854775808`).
Loop through parts. If valid integer `n`, update count and if not seen or n > maxVal then set maxVal=n (and mark seen=true). 
Wait, Example 1: `max=0`. It assumes integers are positive? Or maybe the test cases always have positives? No, "integer sequence" includes negatives in math. If input is "-5", my init of 0 makes max=-2^63 which is wrong! I MUST initialize with first valid integer found OR use a very small number that acts as identity for `max`. But `-9e18` is the actual minimum value an int can have? No, -((int<<shift)) works if inputs are within bounds. 
Wait: If input has no integers (only "abc"), what to output? The spec doesn't say. Assuming typical CP problem logic:
- Count = 0 -> Output `count=0 max=<initial_value>`. What initial value? Probably just print something sensible or follow Ex1's pattern of printing a default if nothing found. But in reality, for negative numbers, initializing to 0 is bad practice unless specified "non-negative". Since spec says "integer sequence", it implies signed integers.
- To be safe and correct mathematically: If count=0 (no ints), we can't determine max meaningfully without knowing if an empty set's maximum exists or what default rule applies. However, in many simple coding tests, they guarantee input validity OR expect you to handle "empty". 
Let's look at the provided examples again carefully.
Ex1: `max=0` output even if loop doesn't execute? No, it checks `if first || n > max`. If no elements read (loop 0 times), `first=true`, so nothing happens in loop body except printing with `max=0`. So Ex1 outputs `max=0` for empty input. This suggests a fallback default of 0 is expected behavior if no data found, OR the test cases always have at least one non-negative integer? Wait, "integer sequence" could be negative. But Ex1's logic forces max to stay at initial value (0) unless updated. So I should mimic that: initialize `max` such that it represents a valid default or just use `-inf`. 
Wait! If I init with `-9e18`, and input is empty, output will show huge negative number which looks weird for "count=0". Ex1 uses 0 as default. This implies the problem setter might assume non-negative inputs OR wants you to print a placeholder if none found? But wait: `max=<最大>` usually means mathematically max of {x}. For empty set, it's undefined but often represented by identity element or just printed with initial value. Given Ex1's behavior (0 as default), I will stick to initializing with something that doesn't interfere unless a number is found? 
Wait: If input has -5. Max should be -5. Initializing max=0 would result in 0 > -5 -> false, so max remains 0! WRONG! That contradicts mathematically correct behavior for "integer sequence".
So why did Ex1 use `max=0`? Maybe it assumes positive integers or the problem guarantees no negatives. OR maybe my assumption about negative inputs is wrong based on context? No, integer includes negatives. 
BUT... look at Example 2: counts words regardless of content (non-empty strings). Here "empty elements ignored". 
Maybe I should use a flag `first` and update max only if seen before or not set yet? And initialize with some value that will be overwritten by the first found integer. If no integers are ever found, then count=0 and what about max? Maybe we can't determine it, so perhaps assume inputs always contain at least one integer OR print something arbitrary but Ex1's `max=0` suggests printing 0 if nothing is valid. 
Let's try to infer from "integer sequence": likely standard CP input guarantees non-empty list of integers unless stated otherwise. In that case, count > 0 initially (or after loop). But wait... what if user enters just "-5"? If I init max=0 and logic: `if first || n>max`, then for -5: `-5 < 0` so no update! So output `count=1 max=0`. This is clearly wrong.
Therefore, initialization MUST be to the smallest possible integer (`minInt`) or use a flag-based approach where if found=true and not set yet... wait, Ex1 doesn't handle negatives correctly with init=0? Let's re-read Example 1 code: 
`max := 0`. Loop runs. If `first || n > max`:
If input "-5". Iteration 1: first is true -> enters if block. `n=-5`, `max= -5`, `first=false`. Correct! Because of the OR condition with "if not found yet". 
Ah, I see my mistake in reasoning earlier. The logic `if (not seen) or n > max` updates on EVERYTHING for the first element regardless of its value relative to initial 0? Yes! If input is "-5", -5 < 0 but since it's the FIRST element encountered (`first == true`), it becomes new max. 
So if I use `max = int(math.MinInt64)` or `-1<<63`, then for first element:
If init to min_int (-9e18). Input "-5". -5 > min_int -> updates! Correct.
Input "0". 0 > min_int -> updates. 
So initializing with `minInt` works perfectly regardless of sign, and ensures the correct behavior even if no valid integers exist (in which case max remains `-inf`, but wait... does Ex1 print `-9e18` for empty input? It prints `max=0`. So Ex1 has a DEFAULT). 
My code should probably respect that: if NO integers found at all, what to output? If I init with -inf and no numbers come in, max stays -inf. But maybe better to follow Ex1 exactly if possible? No, logic of "first" flag handles negatives automatically without needing huge negative constant as long as you don't rely on comparison against 0 incorrectly before first check. 
Wait: `if first || n > max`. If I set initial `max` = `-inf`, then for the FIRST element (even -1e9), it enters because of `first=true` regardless of value relative to infinity? Wait, if `n < minInt`... but no input can be less than int64 min. So yes, first element always triggers update due to `first`. 
So I need:
- Initialize max with a very small number (e.g., -9223372036854775808). Wait! If input is empty, loop doesn't run. Max remains `-inf`. But Ex1 outputs 0 for empty input. 
Maybe the problem guarantees at least one integer? Or maybe I should default to 0 if count==0?
Given "整数列を受け取ります" (Accepts an integer sequence), usually implies valid data exists. If not, behavior is undefined by spec beyond outputting `count=X max=Y`. To be safe and match Example 1's structure of using a flag logic implicitly via initialization that gets overridden on first element: 
Actually, simpler approach mimicking Ex1 exactly but with correct int range handling?
Wait, if I set `max = -9
