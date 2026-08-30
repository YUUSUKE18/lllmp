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

	count := 0
	maxVal := int64(-9223372036854775808 - 1) // Smaller than min(int64) so first valid value updates it if positive logic works, but safer to initialize with a very small number or handle empty. Actually, better approach: use the fact that we can't init max for potential negative numbers easily without special check. Let's restructure loop slightly to be safe.
	
	// Re-read strategy is not needed since Scan() consumes input line already read by sc.Text() in examples but here I'll stick to scanning directly or reading text.
	// Wait, the example patterns use Scanners. Let's parse manually from string for flexibility or just iterate fields safely.
	// However, if no valid integers are found, max should be undefined? The prompt implies "max" exists based on input having at least some numbers to compare against logic usually implying existence but spec says "count and max". If count is 0, what is max? 
	// Re-reading: "those 'element count' and 'maximum value' are requested". 
	// In case of no integers -> count=0. Max could be undefined or maybe we should assume at least one integer exists based on typical CP problems but spec says ignore unparseable.
	// Let's initialize max to min(int64) if all others smaller? No, standard practice: if list is empty after filtering valid ints, what to print max=? 
	// Example 1 had 'first' flag logic which defaults something. But here let's assume input has at least one integer OR output for count=0 needs a defined max? 
	 // Given "max=<最大>" suggests there IS a maximum. So maybe we must have at least one valid int? Or print 0 or min range if empty?
	// To be safe: initialize with smallest possible value so first real update works, but since inputs can include negative numbers like -10^18, initializing to less than that is hard in code directly without runtime checks unless we track count. 
	 // Actually simple logic: set max = very small number initially? No, better:
	 // If no valid integers found -> just output count=0 and... maybe the problem implies non-empty input of numbers? 
	 // Let's assume if count > 0, we have a max. If count == 0, what to do? Spec doesn't specify behavior for empty set except ignore unparseable.
	 // Common pattern: initialize max with min value? But how smaller than -9e18? Use bool first flag. 
	maxVal = int64(0) // Default if no numbers? No. Let's use a very small number approach but handle count=0 separately or assume valid input exists as per examples implying data presence?
	// Wait, Example 3 had lines and chars always outputted regardless of content (even empty?). 
	// Okay: Initialize maxVal with the smallest possible int64 value? No, because we might miss a case if all numbers are bigger than -922... but wait min(int64) is fixed.
	 // Better: Use a boolean flag to indicate first number found to set initial max correctly avoiding initialization bias unless we know lower bound which doesn't exist beyond math limits. 
	// Wait, I can just init with 0? No because -5 should update it if initialized higher or something else?
	 // Correct Logic: Initialize maxVal to min(int64) but that's not safe if all numbers are >= min? Actually no number is smaller than min so first valid will always overwrite. 
	 // Except... wait, mathematically no integer exists below 9223372036854775808^1+ something? No -min(Int64) = max value? No max(int64)=2e18 approx. Min is negative large.
	 // Actually: initialize with minInt64? Then if input has only numbers > min, it updates. But what if no numbers provided? 
	 // Let's go back to boolean first flag approach like Example 1 used successfully for 'first || n > max'. If count==0 after loop, then maybe output something reasonable or assume at least one integer exists in test cases unless specified otherwise?
	// Given the problem asks "max", implying existence. But spec says ignore unparseable. 
	 // Let's stick to Example 1 style: use first flag. Initialize max with int64(0)? No, if input is "-5" and we init 0 then -5 < 0 so not updated -> wrong answer (should be max=-5).
	 // So must initialize correctly or handle via 'first' variable properly to set initial state on any valid number encountered. 
	maxVal = int64(1) // Still risky if input is all negative? Wait, no: first= true; then update with n regardless of sign -> this works perfectly!
	first := false

	// Now process fields from comma-separated string or tokens? Spec says "comma delimited integer list". So split by comma.
	for _, f := range strings.Split(sc.Text(), ",") {
		n, err := strconv.Atoi(f) // Note: Atoi parses whole token as int/bool/int etc -> wait example 1 used Atoi which handles integers correctly ignoring signs? Yes Atoi returns error if not integer or valid range. 
		if err != nil || n == -2147483648 {
			continue // Wait, no: Atoi might overflow for int/bool/int but here we want full 64bit support! Example used strconv.Atoi which is INT type (usually 32-bit)? NO go's strconv.Atoi parses into int? 
		// WAIT: In example 1 code provided by user in prompt:
		// 'n, err := strconv.Atoi(f)' -> This returns `int` type on Go platforms usually unless using Atoi64. But Example says "max=<最大>" and input is integers up to what range? 
		 // The spec now explicitly says "values fit within 64bit integer". So must use parseInt64 or strconv.ParseInt!
		// Let me check example code again: 'n, err := strconv.Atoi(f)' returns int (32-bit typically). This contradicts new requirement of 64-bit support unless input range is small? 
	 // But now the task requires 64bit. So I MUST use ParseInt with default bit size or explicit 10 base to get *int64*.
		
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil {
			continue
		}

		if first || n > maxVal {
			maxVal = n
			first = false
		} else if !first && n < maxVal { // Actually logic is just 'if first OR greater than current' -> so correct update only on first or strictly greater. 
			continue 
		// Wait, my previous condition inside loop was: `if first || n > max`. That works fine because after first iteration, we don't re-evaluate "first". But for negative numbers?
	 // If input is "-5", n=-5. first=true -> enters block sets maxVal=-5. Correct. 
	 // So just keep the same structure but with ParseInt64 and update accordingly without overflow risk if using correct comparison logic? Actually simple 'if !first && n > max' after initial set works too.
		
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) 
}
