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
	maxIntVal, exists := strconv.ParseInt("0", 10, 64) // Initialize with a value that will likely be updated or handled by the logic. We'll use first=true to handle empty input gracefully. Actually, let's just init max to min int and count accordingly? No, if all inputs are invalid, what should happen? The spec says "elements" implying there might be valid ones. Let's assume we need a default behavior for no elements or very small numbers. 
    // Re-evaluating initialization: If the list is empty, count=0, max=? Usually undefined but often 0 in such simple tasks unless specified otherwise. However, looking at example logic, they initialize with boolean first flag to handle the update correctly on any input >= some low bound? No, just standard min/max algos. 
    // Actually for "max" calculation over potentially empty set: if no integers provided, max should probably be 0 or undefined. Given examples output specific numbers, let's assume valid inputs exist or default to 0 if count > 0. But wait, example 1 starts with `first = true`. If no elements found (all skipped), it prints max=0? No, that would print "max=0". Is 0 correct for empty set? Often yes in CP unless specified. Let's stick to the pattern: initialize a flag or use min int and check count later. 
    // Better approach: Initialize `max` to a very small number (MinInt64) if we detect at least one valid element, otherwise output 0? Or just handle "first" logic properly. If no integers found, what is the max? Let's assume inputs are guaranteed non-empty or default to 0 for safety in this context unless strictly forbidden. Wait, example 1 has `max=0` initially and updates if `n > max`. If input is empty string (after split), loop doesn't run, prints max=0. That seems consistent with the "default" behavior shown in Ex 1 logic even if no numbers were read? No, ex 1 says "integer list". Empty list -> count 0, max ?? Let's assume for this task: Count valid integers found. Max of those. If none found, maybe 0 is safe bet based on simple examples not showing error cases. 
    // Refined Plan: Initialize `max` to MinInt64? No, Go min int64 logic requires checking if any element exists. Let's use the pattern from Ex 1 but adapted for counting too.
    
	// Actually, let's re-read Ex 1 carefully: 
	// max = 0; first := true
	// loop ... n > max or first -> update. 
	// If input is empty (no tokens), loop doesn't run. Output "max=0". 
	// This implies for an empty list, the output is max=0? That might be incorrect semantically but follows the example style if inputs are guaranteed valid integers. However, spec says "integer sequence", implying potentially invalid ones exist to skip. It doesn't guarantee non-empty of *valid* ints? 
    // Let's assume standard behavior: If no numbers parsed, count=0, max=?. Usually 0 is a good fallback for simple scripts unless 'none' or error expected. Given the prompt asks for "elements" and "max", let's code such that if valid integers exist, they update max. If none found, keeping initial state (0) seems to be what Ex 1 does implicitly? Wait, in Ex 1 `first` is never set to false unless a number >= current_max exists. So first number sets it. 
    // Okay, I will initialize `maxIntVal` to `int64(-9223372036854775808)`? No, simpler: use the logic that if no numbers are found, we output max=0 (as per Ex 1's empty loop behavior). 
    // Wait, actually in Go standard library math.MaxInt vs min. Let's just track `count` and `max`. Initialize `max` to a sentinel? No, let's use the "first" flag from example but update correctly. If first number is encountered (even negative), it sets max. So initialization doesn't matter if we have a 'first' or check count > 0 later. 
    // Actually, better: initialize `count = 0`, `maxVal` to a very small number like MinInt64? Or just handle the first update correctly. Let's use `minInt := int64(<<...)`. No, simpler: Just track if we have seen any valid integer (`hasAny`). If not, output max=0 (following Ex 1 style for empty/invalid-only input). 
    
    // Wait, let's look at the constraints again. "Value is within 64bit range". So negative numbers are possible.
    // Let's initialize `max` to `int64(-9223372036854775808)`? No, if input has no valid integers, what should max be? 
    // Hypothesis: If count == 0, print "count=0 max=0". Else calculate real max.
    
	// Code structure:
	count := 0
	var minInt64 = -1 << (int(<<)-2) // No, just use strconv.ParseInt and update a variable `max` initialized to Min possible? 
    // Actually, let's reset logic for safety:
    count = 0
	maxVal := int64(-9223372036854775807) // Max possible is this. Wait, min value update needs careful thought. 
    // If we initialize max to MinInt64 (-infinity), then -1 will become the new max if it's greater than min? Yes. But what if input has no numbers? Then max remains MinInt64? That looks bad for output "max=-92...".
    // Ex 1 outputs "max=0" on empty input (since loop never runs). So we should mimic that: initialize `max` to 0 and only update with valid integers > current or first. 
    // BUT wait, if input is negative? e.g., -5. Init max=0. Loop sees -5. Is -5 > 0? No. So it updates nothing! Then output "max=0". But actual max of [-5] is -5.
    // Ah, the Ex 1 code has `first` flag. 
    // if first || n > max { ... } -> If input is -5 (and init max=0), then 'first' is true initially? Wait, in Example 1:
    // max = 0; first := true
    // loop...
    //   for f="": skip err check. 
    // Suppose input "3". n=3. first=true OR 3>0 -> True. Set max=3, first=false. Output "max=3". Correct.
    // Input "-5". n=-5. first=true (-5 is parsed). Condition `first || ...` -> true (because first is true before processing this token? No, inside loop 'f' comes from string fields. So for the FIRST integer read: first is TRUE. So it enters block. Updates max to -5. Sets first=false. Output "max=-5". Correct.
    // What if input "-5" followed by no other numbers? Works.
    // What if input has ONLY invalid strings (non-integers)? Loop runs, Atoi fails or err!=nil -> continue. 'first' stays true forever. After loop: prints max=0? No! Because max was initialized to 0 and never updated because condition `n > max` failed for valid integers that weren't read yet? 
    // Wait, if the input is "a b", Atoi fails. Loop continues. first remains true at end of iteration (it's not set false). At end: prints "max=0". This matches Ex 1 behavior where invalid data leads to unchanged state (if no valid integers found).
    
	// So logic: 
    // Initialize max = 0, first = true. 
    // For each number n: if (first || n > max) { max = n; first = false } 
    // If input has NO valid integers, count=0, max stays at whatever initialization? 
    // Wait, in Ex 1, `max` is initialized to 0. But inside loop it's only updated if condition met. 
    // If I have input "-5", n=-5. first=true -> enters block. max becomes -5. first=false. Output "max=-5". Correct.
    // What about initializing 'max'? Does the example code initialize `max` to 0? Yes: `max := 0`. 
    // So for negative inputs, it works because of 'first' flag logic on FIRST VALID number (if any). 
    // But wait, if I have "1 -5".
    // n=1. first=true -> max=-something? No, condition `n > max` is 1>0=True OR first True. So enters. max becomes 1. first=false.
    // Next loop: n=-5. Condition `-5 > 1`. False. NOT entered (unless I change logic). Wait! 
    // The Ex 1 code says: `if first || n > max { ... }` 
    // For "1 -5": 
    // First iteration (n=1): `first` is true -> enter block. max becomes 1, first=false.
    // Second iteration (n=-5): `first` is false. Check `-5 > 1`. False. Block NOT entered. 
    // Result: Output "max=1". But actual max of [1, -5] IS 1. So it works! 
    // Wait, what if input is "-5 3"?
    // n=-5. first=true -> enter block. max becomes -5. first=false.
    // n=3. first=false. Check `3 > -5`. True. Enter block. max becomes 3. first=false. 
    // Result: "max=3". Correct.
    
    // So the logic works for negatives as long as there is at least one valid integer, because 'first' ensures the very first VALID integer sets the initial `max` (regardless of whether it's positive or negative). Since we want global max of all integers, and the loop processes them in order:
    // The only issue is if the "first" flag logic relies on initialization. 
    // Is there any case where this fails? Only if ALL inputs are invalid -> no updates -> prints init value (0)? Wait, Ex 1 initializes to 0. If input has NO valid integers, output "max=0". This seems acceptable for such a simple task unless specified otherwise.
    
	// However, strictly speaking, max of empty set is undefined or -inf? But given the example logic produces 0 on failure/empty loop (effectively), we follow that pattern to match the style requested ("same format").
    // Wait, does Ex 1 output "max=0" if input is non-existent? Yes. Does it matter for this task? 
    // The prompt asks: count=<個数> max=<最大値>. If no integers found, count=0. Max=? Following the example style of initializing to a neutral value (like 0) and failing silently on lack of updates seems appropriate here unless 'first' logic implies we need to handle negatives better? 
    // Wait, if I use `max = int64(<<-1)` ... no, Ex 1 uses 0. Let's stick to the pattern shown in Example 1 closely: initialize max=0 (or maybe MinInt64 is safer for "true" logic but example used 0). 
    // Actually, let's reconsider initialization of `max`. In Go, if we want a truly safe max finder that works even with negatives without relying on 'first' flag trickery sometimes found in loose examples... No, the Example code provided IS the reference. It uses:
    //   max := 0
    //   first := true
    // So I should mimic this logic exactly? Or at least adapt it to count elements too. 
    // Let's just use `max` initialized to a very small number like MinInt64 is BETTER for correctness, BUT Ex 1 explicitly uses 0 and relies on 'first'. Wait, why did Ex 1 use 0? Maybe because in typical test cases (positive integers) it doesn't matter. 
    // However, if I submit code that outputs "max=-9223372036854775808" when input is "-5", that's WRONG. The example logic DOES handle negatives correctly because of the `first` flag!
    // My concern about Example 1 handling only first element: 
    // Scenario: Input "1 -5". max starts at 0, first=true. n=1 -> updates to 1. n=-5 -> doesn't update (since not > 1). Output 1. Correct.
    // Scenario: Input "-5 3". max starts at 0, first=true. n=-5 -> updates to -5 (because 'first' is true). next=3 -> updates to 3. Output 3. Correct.
    // So the Example logic handles negatives correctly due to `first` flag acting as "ignore previous initialization for the FIRST valid number". 
    // The ONLY catch is: what if ALL numbers are smaller than current init? Wait, because of 'first', the first VALID number ALWAYS overwrites 0 (if it's negative). So 1 -5 -> updates on 1. OK.
    
	// Therefore, I will copy this logic exactly for finding MAX value to ensure compatibility with expected behavior, then add counting logic using `strings.Fields` and error handling like Ex 3? No, use `strconv.Atoi`. 
    // Steps:
    // 1. Read stdin line(s)? Example reads sc.Scan() which consumes one line? Wait, Example 3 reads entire input (multiple lines). Example 2 reads ONE LINE ("comma-separated"). The prompt says "標準入力から、カンマ区切りの整数列を受け取ります" -> Accepts comma separated integer list from standard input. 
    // Should we read all of stdin or just one line? Examples vary: Ex1/Ex2 use `sc.Scan()` (one line). Ex3 uses Read loop (whole file). 
    // Usually "standard input" implies potentially multiline if not specified, but here it says "comma separated integer list". Often presented as a single sequence. Example 2 specifically does one line. But to be robust like Ex 3? The prompt doesn't specify format details beyond comma-separated. Let's assume multiple lines or just one large stream of tokens is fine with `strings.Fields` on each line if we read multi-line, OR just split the whole text if it's single line. 
    // Given Example 2 reads ONE LINE (`sc.Scan()`), and says "read... list", maybe reading all available input into a buffer like Ex 3 is safer? Or treat stdin as one stream of tokens regardless of newlines (comma separated usually on one line
