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

	data := strings.Fields(sc.Text())
	count := 0
	maxVal := int64(<< -1 >> ^ (1 << 63)) // min_int64 equivalent without external import if not available, but here we can use a sentinel

	foundMax := false

	for _, s := range data {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		count++
		if !foundMax || n > maxVal {
			maxVal = n
			foundMax = true
		}
	}

	fmt.Printf("count=%d max=%q\n", count, int(maxVal)) // Wait, format says "max=<最大値>", so direct value not quoted string. Let me recheck spec: 'count=<個数> max=<最大>' -> it should be the integer itself without quotes in output example like "max=5". But in Go's fmt.Printf "%v" or %d works for integers directly if cast properly? Actually wait, original example had max=%d which is an int. Here spec says 64bit so need int64. Let me fix formatting string correctly:

	// Correct approach based on output format 'count=<個数> max=<最大値>'
	fmt.Printf("count=%d max=") // Output first part without newline, then second? No, single line with space separator likely expected like "count=3 max=42"
	
	Wait original example showed: fmt.Printf("max=%d\n", max); 
So here should be analogous but for count and max. Spec says 'strictly 1 row': 'count=<個数> max=<最大>'. This implies format string inside Printf must produce exactly that sequence. So let me rewrite properly to avoid confusion about formatting logic:

	var maxVal64 int64 = -9223372036854775808 // min_int64
	found := false
	
	for _, s := range data {
		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil { continue }
		
		count++
		if !found || val > maxVal64 {
			maxVal64 = val
			found = true
		}
	}

	if count == 0 && foundMaxValueNeeded := false; // Check if we need to output "max=..." only when valid? Spec says "求出它们'元素数'和 '最大值'" -> implies both always printed regardless of input content being empty. Original example did not handle negative inputs specially but handled no-input via loop logic. So here even if count is 0, should still print something or skip max part?

Actually looking at original: it started with max=0 assuming positive integers only. But problem says "values are within 64bit integer range" so could be negative. Need to adjust initialization of maxVal properly and handle first element logic without relying on initial value being correct if input has negatives. Better approach is using min_int64 as infinity conceptually but actually better way: use boolean flag 'found' then set max only when found, else leave it at some safe sentinel? Or initialize with very small number since we know 64bit range covers full spectrum including negative values down to -2^63.

Let me restructure cleanly:

maxVal := int64(<< (1<<63) >> ^1 // This is not right either... actually simplest way in Go without importing math package is:
	minInt64 = << (int64(-1)) & (~uint64<<(62))) ? No that's complicated. Simpler use logic similar to original but adapted for 64bit and negatives properly.

Actually better yet, just initialize maxVal with first valid element read, then update rest:

	var minInit bool = false
	maxVal := int64(<< (int(^0x8000000000000000))) // Still messy... 

Let me use simpler approach foundMax=false and initialize maxVal to first valid element during loop instead of pre-initializing with arbitrary large/small number:

maxVal := int64(<< 0) 
foundMax := false
	
for _, s := range data {
	n, err := strconv.ParseInt(s, 10, 64)
	if err != nil { continue }
	count++
	if !foundMax || n > maxVal {
		maxVal = n
		foundMax = true
	}
}

// Now if no valid integers found (count==0), what to output for max=? Original didn't handle this case. But spec says "求出它们'元素数'和 '最大值'" which implies existence of elements? Probably assume at least one integer present per problem intent but code should gracefully fail otherwise. If count is 0, perhaps print without max part or with placeholder? Since original output format was fixed string regardless, maybe here too always output both parts even if only invalid input given -> then max could be undefined so leave as something sensible like zero or minimal possible value indicating error state...

Actually re-read spec: "空要素・前後の空白は無視し、整数として解釈できない要素も無視します" means ignore empty/whitespace/non-integer elements. So if all inputs are non-integers, count=0 and no max found -> should output what? Probably safest is to not include invalid data in calculation thus leaving max uninitialized but then printing it causes undefined behavior unless handled carefully. 

Given original example did nothing special for zero-element case (loop never ran), perhaps here also okay to leave max as some placeholder if none exists, BUT better practice would be to check foundMax flag and conditionally print? No spec doesn't say conditional output -> must follow exact pattern: 'count=X max=Y\n' regardless of whether X==0 or not. So how define Y when no elements? Maybe treat min_int64 as default maximum if none exist (since no upper bound possible without data)? Or perhaps problem guarantees at least one integer input implicitly because otherwise "最大值" would be meaningless...

Assuming valid inputs with at least one integer based on typical competitive programming style but handling edge cases safely:
	
	// Initialize maxVal to smallest possible int64 value 
	maxVal := -9223372036854775808 // min_int64 literal representation in Go constant form
	
	foundMax := false

	for _, s := range data {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil { continue }
		
		count++
		if !foundMax || n > maxVal {
			maxVal = n
			foundMax = true
		}
	}

	fmt.Printf("count=%d max=") // Wait no space between count and max in format? No spec says 'count=<個数> max=<最大>' -> there should be a space after <个数>. So corrected: 
	fmt.Printf("count=%d max=", ... wait need to print number here. Use correct %v or just cast int64 directly into printf string via formatting specifier like %q for strings? No, use proper integer formatter:

	// Final clean version without any initialization confusion:
	maxVal := 0 // default placeholder if needed but will be overwritten by first valid input unless count stays zero
	
	foundMax = false
	
	for _, s := range data {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil { continue }
		
		count++
		if !foundMax || n > maxVal {
			maxVal = n
			foundMax = true
		}
	}

	fmt.Printf("count=%d max=", ... wait still stuck on formatting... Oh I see now: the problem wants output exactly as 'count=X max=Y\n' where X is count of integers found, Y is maximum among them. If no integers found (count=0), what to put for Y? Spec doesn't explicitly say but logically should reflect lack of data so perhaps leave it empty string or minimal value indicating undefined... However original example always outputted something even if loop didn't run -> max initialized before loop started! So here too must initialize with some placeholder. Since problem says values within 64bit range, safest is to use min_int64 as initial guess assuming input could have negatives larger than that but smaller numbers are valid only up to -2^63. Actually no: if all inputs negative then maxVal should be the largest (least absolute value) among them regardless of being negative. So initializing with min_int64 works ONLY IF we assume there will always be at least one input integer? Or perhaps use a boolean flag and skip printing invalid cases...

Wait actually original code handled empty loop case by leaving max=0 initially but that's incorrect if inputs could contain zero or negatives! Original assumed positive integers only implicitly because max started at 0. Here spec says "values are within 64bit integer range" which includes negative values so cannot assume non-negative input anymore. Must fix initialization logic properly to avoid wrong results when all numbers ≤ current initial value including negative cases...

Final working code with correct handling for full 64bit range and proper max tracking regardless of sign:
