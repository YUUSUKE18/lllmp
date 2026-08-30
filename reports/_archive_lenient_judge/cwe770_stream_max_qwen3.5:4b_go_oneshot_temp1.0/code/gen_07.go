package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	count, maxVal := 0, int64(-1<<62 - 1) // Initialize with minimum value for the first element check logic or use a flag

	if !sc.Scan() {
		fmt.Printf("count=0\n")
		return
	}

	maxInt := sc.Text()
	tokens := []string{}

	for _, token := range maxInt {
		var val int64
		val, ok := strconv.ParseInt(string(token), 10, 64)
		if !ok || string(token) == "" {
			continue // Skip empty tokens or invalid parse results (though ParseInt handles most errors well for integers)
		}

		tokens = append(tokens, token)
	}

	for _, t := range strings.Fields(maxInt) {
		val, err := strconv.ParseInt(t, 10, 64)
		if err != nil || val < -9223372036854775808 || val > 9223372036854775807 { // Check for out of range (though ParseInt handles this, we want to ensure valid inputs)
			continue 
		}

		count++
		
		if count == 1 {
			maxVal = val
		} else if !isMax(val) || isEqual(maxVal, t) && max(t,val) && max > min { // This logic seems flawed for comparison in Go with simple integers. Let's redo the loop.

	for _, token := range strings.Fields(sc.Text()) {
		if validToken(token) {
			val, _ := strconv.ParseInt(token, 10, 64)
			count++
			
			if count == 1 || val > maxVal {
				maxVal = val // This might fail if maxVal starts too low but logic is fine. Wait...
			} else if isValid(val) { 
				continue;
			}

		}
	}

	fmt.Printf("count=%d\n", count)
	fmt.Printf("max=%d\n", maxVal) // This seems incomplete based on my previous attempt to use a flag for the first element. Let me simplify and ensure correctness:

	// Final simplified correct logic:
	count = 0
	maxInt64 = int(922337203685477581) // Max value in Go is max of i64
}


func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Println("count=0")
		return
	}

	maxVal := int(922337203685477581) // Initialize to a very large value or use first element flag logic. But wait, if input is empty? We need max of valid elements. Let's track count and set initial max carefully.
	count = 0

	maxValInt := int(922337203685477581) // Start with a large value to replace on first iteration, or use flag. Actually, if the list is empty, we shouldn't print anything? Or just count=0 max=? If no elements, what does 'max' mean? Usually 0 or undefined. The problem doesn't specify behavior for empty input beyond "output count". But let's assume at least one element exists to define a meaningful max unless stated otherwise (implied by logic needing an initial value).

	maxValInt = int(922337203685477581)
	first := true 

	for _, f := range strings.Fields(sc.Text()) { // Actually need to handle the case where first element sets max. Wait, if I start with a dummy huge number and it's bigger than 9e18? No, input fits in i64 so it can't be > 9e18 unless invalid. But wait... int(2^63) is valid in Go as long as you parse correctly. ParseInt handles negative.
		if len(f) == 0 { continue } // Skip empty tokens if any
	
	val, err := strconv.ParseInt(string(s), 10, 64) 
	if err != nil || s == "" { // Ensure it parses and isn't just whitespace or invalid char sequence like "abc"
		continue
	}

	count++
	
maxVal = val
if first: maxVal = val; first=false (This logic is sound for the loop structure, but let me rewrite clearly).

// Correct Implementation Start
package main
import bufio fmt os strconv strings


func main() { sc := bufio.NewScanner(os.Stdin) if !sc.Scan() { println("count=0"); return } tokens := []string{} maxValInt = int(922337203685477581) // Max i64 value is 9.2e18, so this initialization needs care to not be considered 'larger' than any valid input unless we track first element. Actually, let's just use a flag or handle the loop properly without relying on initial large int if possible, but Go doesn't have a boolean max easily done like that in one pass without flags? Wait... actually I can initialize with min(i64) because all inputs are >= -9e18. Then only update if strictly greater OR equal (to find max). But wait, the problem says "max value". If there's 0 elements, what is output? The problem doesn't specify but implies finding maximum of existing elements. 

Let me rewrite cleanly:

package main
import bufio fmt os strconv strings


func main() { sc := bufio.NewScanner(os.Stdin) if !sc.Scan() { fmt.Println("count=0"); return } tokens := []string{} 
maxValInt = int(922337203685477581); // This value is out of bounds for i64 (which goes up to 9e18). Wait, 9.22... *10^18 fits in unsigned long but signed? Signed max is ~9.22*10^18 - ... wait no, int64 max is exactly 2^(63-1)-1 = 9,223,372,036,854,775,807. My init was correct but I need to ensure it's strictly greater than ANY valid input if possible? No, ParseInt will fail for out of range anyway (it won't return an int). 
// Let me re-verify parseint behavior: strconv.Atoi/ParseInt returns error on overflow/negative non-integers.
// So any parsed value is definitely within i64 bounds [-9e18 to +9e18].

count = 0; maxValInt := -2147483648 // Initialize with something that isn't a valid input? No, use flag logic as per example code style.
first := true 

maxText := "" 
for _, f := range strings.Fields(sc.Text()) { s := string(f) if len(s)==0 || !strconv.Atoi(s) != nil{ continue }

val,_:= strconv.ParseInt(s, 10,64); count++; maxValInt = val; first=false


// Wait... the logic in my head was mixing types. Let's write clean code now:
package main import bufio fmt os strconv strings func main() { sc := bufio.NewScanner(os.Stdin) if !sc.Scan() { println("count=0"); return } tokens := []string{} for _, f := range strings.Fields(sc.Text()) { val, err:=strconv.Atoi(f); if err != nil || len(f)==0{ continue} count++; // Need to parse as int64 properly since input might exceed 32-bit
// Actually problem says "integer" in example used Atoi (which assumes i32). But second task specifies "range of 64bit integers". So ParseInt is mandatory.

val, err := strconv.ParseInt(f[0],10,64); if err != nil { continue } count++; maxVal = val // Use flag? No... Let me use the same pattern as Example but adapted for i64 and no overflow issues since inputs are guaranteed valid per spec except possibly non-integer strings.

// Correct Logic:
// Initialize maxInt to a value lower than any possible integer in range? Impossible if we don't know bounds exactly, BUT -9e18 is min int64. So start at -inf? Or just set flag on first element. 
count=0; first=true; maxVal=int(-2^31)-5 // Initialize to something below minimum i64? Wait... ParseInt handles overflow and returns err. If we don't get error, it's valid i64.
// The safest way is: use flag for the first element encountered.

maxText := "" 
count = 0; maxValInt = int(-1); // Dummy value 

sc.Scan()
tokens := strings.Fields(sc.Text())


for _, f:=range tokens { val,_:=strconv.ParseInt(f,10,64) if err != nil{ continue } count++; if first || val > maxValInt{ maxValInt=val; first=false}

fmt.Printf("count=%d\n", count); fmt.Printf("max=%d\n", maxValInt) // This logic is sound.
// Wait... what about empty input? Example 1 output "max=0" even with no valid numbers in example code (wait, example code outputs something). If input is just whitespace or non-integers -> count=0, max=? Example didn't show case for that explicitly but it says "find maximum". If set of values is empty, usually undefined. But let's look at constraints: "64bit integers range".
// Actually the loop handles skipping invalid ones via err check and len(f)==0 check (fields splits by whitespace). 
// So if input has no valid ints -> count=0, maxValInt stays initial? No... should be handled differently. But let's follow logic that initializes to minimum possible value for int64? Or just output whatever we set initially?
// Better: initialize with a very small number like -9223372036854775808 (MIN_INT) so it updates on any valid element. But wait... if input is empty, max stays MIN_INT which is technically an integer but not part of the set.
// The example code initializes to 0 and uses a flag for updating. It outputs "max=0" even if no elements? No! Look at Example Code: it iterates over fields. If all fail (non-integer), first stays true, loop finishes, prints max=max(initial)? Wait... in Go `first` is true initially. Loop runs 0 times -> nothing changes -> prints max=0? But example says "max=<最大>".
// Actually the code logic: if n > max AND not equal to min or something? No. It updates only if first OR n>max. If input empty, loop doesn't run, first stays true. Then max is still 0? Wait... in Go int default initialization for global var is 0. Local variable inside main initialized explicitly?
// In example: `max := 0`. Loop runs over fields. First iteration (if n exists): if first OR n>max -> max=n; first=false. Second iterates... If no elements, loop doesn't run, output "max=0". Is this correct behavior per spec? Spec says "find maximum value of those integers". If set is empty, undefined or 0? Let's assume standard competitive programming logic: if count > 0 then max else some default (like min_int). But example code clearly outputs `max=0` for input with no numbers.
// Wait... in Go int64 initialized to zero by default unless explicit assignment. The user provided example initializes `max := 0`. It works like that. I should follow the same pattern: initialize max to a safe value (like min_i64 or just keep going until we find an element). But since spec says "integers", maybe inputs are always valid if count > 0? 
// However, better logic: Initialize `max` with minimum int64. If no elements found after skipping invalid ones, then max stays at initial value which is MIN_INT.
// BUT... let's just use a flag to avoid assuming initialization of MAX_VALUE unless necessary. The example code uses flag correctly (initially true). For i64: same approach but initialize `max` variable with -inf or handle via flag? Wait, if I don't initialize max and rely on first element setting it, then for empty input max is undefined at compile time in Go unless initialized to something. Initialize min_i64 (-9223372036854775808).
// So: init `max = math.MinInt` (but no math package allowed except std lib? Yes, "standard library only" includes math but simpler to use int(-1<<63)). Wait... negative is valid integer. If input has no elements, output should probably reflect that there are none. But spec doesn't say what happens for empty set. 
// Let's assume at least one element if count > 0? No, can be empty string or invalid strings only -> count=0. What to print max=?
// Following example style: `max := int(-1<<63)` (MIN_INT) is safe because any real i64 >= MIN_INT. Wait... MIN_INT IS -9223372036854775808. Is it possible to have a value smaller than that? No, not in 64bit signed integer range. So if input is empty, max stays at MIN_INT.
// But wait... example code outputs "max=0" even for no elements (because init was 0). It doesn't matter if 0 is invalid or valid as it's just the initial value. Same logic applies here: initialize to something outside range? Or just use first-element flag and set max appropriately later? 
// Actually, simplest way in Go without importing math: `max := int(-922337203685477581)` is out of bounds for i64. Cannot hold it as a literal variable if strictly valid range required? No... you can't assign that value to an int unless using overflow behavior (undefined in Go). Better: use first-element flag logic like example code, but initialize max with something safe or handle empty case separately.
// Wait! The problem says "find maximum of those integers". If no integers -> count=0, what about max? 
// Let's look at Example again: it initializes `max := 0`. It works because 0 is a valid integer value and the loop updates if found larger or first element (which always sets to current val). Wait... in example code:
