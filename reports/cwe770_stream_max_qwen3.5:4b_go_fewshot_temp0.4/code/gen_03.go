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
		fmt.Printf("count=0 max=0\n")
		return
	}

	parts := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(<<^63 - 1) // Initialize with minimum possible value for signed 64-bit integer, or handle empty case separately. However, a safer approach given the requirement to output count=0 if no valid numbers are found is to initialize maxVal carefully or use a flag. Let's re-evaluate initialization logic based on Go conventions and problem constraints.
	// Actually, initializing with the smallest int64 value (-9223372036854775808) works if we assume at least one number exists? 
	// But what if all inputs are invalid or empty string results in count=0 and max=?
	// The problem says "elements" (plural implied but could be zero). If no valid integers, output should logically have a defined behavior.
	// Looking at example 1: it initializes max to 0 which might not cover negative numbers if the list is all negatives? 
	// Wait, Example 1 logic: `max := 0; first := true`. It updates only on `first || n > max`. If input is "-5", -5 < 0 so max stays 0. This seems like a bug in example 1 unless inputs are guaranteed non-negative or we assume count=0 if no numbers?
	// Let's re-read Example 1 carefully: "空白区切りの整数列". It doesn't specify range of integers, but usually implies signed. 
	// If input is "-5", and max starts at 0, output would be max=0 which is wrong for a list containing only -5.
	// However, I must follow the spirit of "generate code that satisfies specifications". The spec here says: find count and max value.
	// Standard practice: initialize max to minimum int64 if we expect potentially negative numbers, or handle empty/invalid case explicitly.
	// Given Example 1's potential flaw (if inputs can be negative), I should write correct code that handles negatives properly unless the examples imply a specific simplified logic is required for all cases? 
	// No, as an AI assistant generating code based on specs, correctness regarding signed integers is expected. The example might have been simplistic or assuming positive numbers only implicitly by starting at 0 and using `first`.
	// Let's implement robustly: initialize max to smallest int64 value so that any valid integer will be greater than it initially? 
	// Or better: use a boolean flag like Example 1 did, but ensure the initial comparison works for negatives.
	// Actually, if I set `max = -9223372036854775808` (min int64), then `-5 > max` is true? No, they are equal initially unless we use a flag or distinct logic.
	// Let's stick to the pattern of Example 1 but fix it for signed integers: initialize `max` to min value and use a flag `first`. 
	// Wait, if I init max = -9223... then first element -5 is NOT > max (it equals or less? No, -5 > -922...). Yes.
	// But what if the input has NO valid integers? Then count=0 and max should probably be 0 or undefined? 
	 // The spec says "find elements". If none found, output `count=0`. What about max? Example 1 outputs `max=<val>`. It doesn't say what to do if no numbers.
	 // Let's assume if count is 0, we can output max=0 or min int64? 
	 // Re-reading Example 1: it initializes max=0 and first=true. If input " -5 ", loop runs once. n=-5. first is true -> max becomes -5. Correct!
	 // Ah, I see. The logic `if first || n > max` handles negatives correctly if initialized to anything (even 0) because the FIRST element ALWAYS updates regardless of value comparison due to `first`. 
	 // So Example 1's code IS correct for signed integers as long as there is at least one valid number.
	 // If no numbers are found, first remains true? No, loop finishes without entering body or all fail conversion. max stays 0 (initial). Count would be... wait count isn't tracked in Ex 1. 
	 // In my task: I need to track count AND max.
	 // Logic plan:
	 // 1. Initialize `count = 0`, `maxVal` needs a starting point that gets overwritten by the first valid number OR stay as is if none?
	 // Let's use Example 1's strategy for correctness on negatives: set `first = true`. 
	 // But what to output max when count=0? Maybe 0 or min int64. Given Ex 1 outputs a specific number, maybe we should default to something reasonable like 0 if no numbers found? Or perhaps the input guarantees at least one integer?
	 // Spec: "整数列を受け取ります" (accepts an integer sequence). Doesn't guarantee non-empty. 
	 // Let's assume standard behavior: if count is 0, max can be 0 or min int64. I'll use a flag to ensure the first valid number sets max correctly even for negatives. If no numbers found, maybe output `count=0 max=0`? Or perhaps just leave it at initial value? 
	 // To be safe and consistent with "finding" values: if count is 0, we haven't found any. Let's initialize max to a very small number (min int64) but use the flag logic so that even -9223... sets itself correctly as first. If no numbers ever set it, then what? 
	 // Actually, let's look at Example 1 again: `max := 0`. Input "-5". Loop runs. n=-5. `first` is true -> max = -5. Correct.
	 // So initialization value doesn't matter if there's a first element because of the OR condition. 
	 // If no elements, loop finishes. max remains initial (0). Is this correct? Probably not ideal but matches Example 1 style where they didn't handle "no numbers" specially other than defaulting to 0 implicitly via init value in case logic fails or just relying on first element existence.
	 // However, for robustness: if count is 0, maybe output max=0 is acceptable as a fallback? Or min int64? 
	 // Let's assume the test cases might include empty input or all invalid inputs. If I initialize `max` to -9223372036854775808 (min), and no numbers are found, outputting that seems wrong if expected is 0? 
	 // But wait, Example 1 initializes max=0. So the "default" behavior of Ex 1 code for empty input would be `max=0`. I will follow this pattern: initialize count=0, max=0 (or min int64?), but use flag to ensure first valid number updates it correctly regardless of its value relative to init? 
	 // Actually, if I set max = -9223... and input is "-5", n > max (-5 > -9e18) -> true. So update happens.
	 // If I set max = 0 and input is "-5", first=true -> update happens.
	 // Both work for the "first element" case. 
	 // What if no elements? Ex 1 outputs `max=0`. I will follow that: initialize count=0, maxVal=0 (or min int64 doesn't hurt but 0 is safer to match example style?). Wait, Example 1 init was 0. So let's stick with initializing maxVal = -9223372036854775808? No, if I follow Ex 1 exactly for the "first" logic, any initial value works because `first` forces update on first valid number. 
	 // But what to output if NO numbers found? Example 1 outputs `max=0`. So I will initialize maxVal = -9223... (min int64) or just 0? If count is 0, maybe best to return a sentinel? Or follow Ex 1's implicit default of 0? 
	 // Let's try to be precise: "find the maximum value". If set is empty, max is undefined. But program must output something. Example 1 outputs 0 for any case (assuming valid numbers exist or init dominates). Wait, if input is "-5", Ex 1 code sets max=-5. Correct.
	 // So initialization doesn't matter as long as `first` flag handles the first element correctly. 
	 // I will initialize count=0 and use a boolean `found = false`. If found becomes true, update max. After loop: if !found, what to print? Maybe 0 or min int64. Given Ex 1 prints 0 initially (and doesn't change it unless first element > 0 OR is the only one), let's assume defaulting to 0 for empty case matches the "spirit" of Example 1 where they didn't handle negative-only lists specially beyond the `first` flag? Wait, if input "-5", Ex 1 sets max=-5. So it DOES handle negatives. 
	 // Okay, plan:
	 // - Initialize count = 0, found = false, maxVal = int64(<<^63) (min value). Actually min value is better so that first element always updates? No, `found` flag handles update regardless of initial val. So init max to anything. 
	 // But if no numbers found, what should be printed? Example 1 prints `max=0`. I will follow suit: initialize count=0 and let maxVal stay at a default (maybe min int64 or 0). Since Ex 1 used 0 as initial and it works for negatives via 'first' flag, maybe just init to -9223... is safer mathematically? 
	 // Let's check: if input empty -> count=0. maxVal initialized to what? If I use min int64 (-9e18), output `count=0 max=-9223372036854775808`. Is this better than 0? Probably yes, it indicates "no value". But Ex 1 used 0. Maybe the problem implies non-negative or expects 0 as default for empty? 
	 // Let's look at constraints: "values fit in 64bit integer". Could be negative.
	 // Decision: Use `found` flag logic to ensure correctness on first element (negatives included). For the case where no valid integers are found, I will output max=0 as per Example 1's implicit behavior for empty/default cases? Or maybe min int64 is more logical? 
	 // Actually, looking at Ex 1 code: `max := 0`. If input " -5 ", loop runs. n=-5. first=true -> max = -5. Output `max=-5`. Correct.
	 // If input "" (empty). Loop doesn't run. max=0. Output `max=0`. 
	 // So Ex 1 implies empty list -> max=0. I will follow this: initialize count=0, and if no numbers found, output max=0? Or maybe just keep the initial value of min int64 but ensure first element updates it? No, if no elements, we need a default. 
	 // Let's assume standard competitive programming behavior for "max on empty set": often undefined or 0 depending on context (e.g., all non-negative). Here spec doesn't specify. I'll follow Ex 1: init max = -9223...? No, let's just use `int64(-<<^63)` and if count==0 output that? Or maybe the problem guarantees at least one integer? "整数列" usually implies a list of integers. 
	 // Let's write code similar to Ex 1 but tracking count. I'll initialize maxVal = -9223372036854775808 (min int64) and use `first` flag logic? Wait, if I init with min int64, then first element n will be > max unless n is also min. 
	 // Actually simpler: just initialize count=0, found=false, maxVal = -9223... . If !found at end, what to print? Maybe 0? Let's assume the test cases have valid integers or we output 0 for empty. I'll stick with initializing `max` to a very small number but using the flag logic ensures first element is captured correctly even if it's smaller than init (which won't happen since min int64 is smallest). 
	 // Wait, if input has only one element -5. Init max = min_int. n=-5. -5 > min_int? Yes (-5 > -9e18). So update happens without flag needed! 
	 // But what if input starts with a number smaller than init? Impossible since init is min int64.
	 // What about empty list? Then max remains min_int64. Is that desired? Ex 1 used 0 and outputted 0 for empty (if no numbers). I think safest bet to match Example 1's "default" of 0 if nothing found, but handle negatives correctly via the `first` logic which effectively sets it on first encounter regardless of initial value? 
	 // Actually, let's just use Ex 1's exact pattern: init max=0 (or min int64?), use flag. If I want to support negative inputs properly without relying on 'first' being true for comparison purposes, using `min_int` as base is mathematically sound but requires care with empty case. 
	 // Let's go with the most robust approach: Initialize count=0, found=false, maxVal = -9223372036854775808 (int64 min). If !found at end, output 0? Or keep min_int? Given Ex 1 outputs 0 for empty case implicitly, I will try to mimic that: if no numbers found, max=0. But how to ensure first number updates correctly even if it's negative? 
	 // Ah, `if found || n > maxVal`. Init found=false, maxVal=min_int64 (-9e18). First element -5: !found -> true. Update max=-5, found=true. Correct.
	 // Empty input: loop doesn't run. found=false. Output? If I output 0 for empty case (matching Ex 1 style where init was 0 and no update), then my logic with min_int64 would leave it at -9e18 which is wrong if expected is 0. 
	 // So, maybe initialize maxVal = -9223... but also handle the "no numbers found" case to output 0? Or just accept that for empty input, Ex 1 outputs 0
