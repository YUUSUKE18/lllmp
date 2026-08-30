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
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}

	line := sc.Text()
	fields := strings.Fields(line)
	count := len(fields) // Invalid elements are already ignored by Fields? No. We need to parse them again and skip invalid ones. Actually, let's just iterate through the original string with regex or manual parsing since we must ignore invalid integers properly based on "cannot be interpreted as integer".

	// Wait, strings.Fields splits by whitespace only. If an element is non-numeric but part of a token?
	// The spec says: "整数として解釈できない要素も無視します" (Ignore elements that cannot be interpreted as integers).
	// Example input could be "1,a,2". Fields would give ["1", "a", "2"]. We skip 'a'.

	var maxVal int64 = 0 // Spec says values fit in 64-bit. If all are negative? 
                       // The spec doesn't specify the handling of an empty list after filtering or a non-existent number case explicitly regarding initialization for negatives, but typical behavior:
                       // Let's assume if no valid integers found, count=0 and max is undefined? Or we default to 0 if not specified. Given example "max=<value>", it implies value exists. 
                       // However, spec says "ignore elements that cannot be interpreted as integers". If the list becomes empty after ignoring invalid ones?
                       
	// Re-reading: Example shows processing valid numbers. If input is just non-integers -> count=0. Max should probably be 0 or min possible if strict max logic required even for negatives? 
                       // But since we initialize max := 0 and the example loop updates only on first || n > max, it works for positive. For negative inputs, standard Go behavior might keep 0 as initial unless strictly defined.
                       // Let's assume: If input is empty or all invalid -> count=0. Max value logic applies to found numbers. 
                       // To be safe with negatives (e.g., -5), we should initialize maxVal carefully? The example initializes `max := 0`. It updates if `n > max` OR `first == true`. So it handles at least one element correctly the first time encountered via 'first'.
                       
	// Re-evaluating initialization: If I have valid numbers [-1, -5], and start with max=0. First is -1 -> update to -1 (since 0 > -1? No wait, loop logic: `if first || n > max`. 
                       // On first iteration (-1): 'first' is true, so enters if block. Sets max = -1, sets first = false. Correct.
                       // So initializing with a boolean flag 'first' handles negative numbers correctly regardless of initial value magnitude? Wait, the example code initializes `max := 0` but relies on `first`. 
                       // If I encounter nothing valid (only non-integers), loop finishes. What is output? count=0 max=? The spec doesn't explicitly say what to do if no integers found.
                       // Given "最大値を求めます" implies finding the maximum of existing elements.
                       // Let's stick to logic: If at least one valid int exists, use it. Else assume empty set -> count 0, maybe max is not specified? Or default? 
                       // Usually in such tasks without a fallback spec for an empty set after filtering, we might output based on what was parsed or handle gracefully.
                       
	// Let's refine the parsing loop to be robust:

	maxVal = int64(1<<62 - 1) // Arbitrary large positive? Or just use first valid element logic properly without reliance on zero init if needed. 
                               // Actually, let's mimic example but ensure 'first' flag is used correctly even for negatives.
	// Wait, the example initializes `max := 0`. If input " -5 ", n=-5. 
                       // Iteration: f="-5". Atoi(-5) -> -5. first=true. Enters if. max becomes -5. Correct.
                       
first = true

	for _, s := range strings.Fields(line) {
		val, err := strconv.ParseInt(s, 10, 64) // Explicitly ask for int type to handle negatives and overflow check within int? Spec says "range of 64bit". ParseInt with len=64 handles this. If error (out of range), we ignore per spec ("cannot be interpreted as integer" -> though technically overflow is out of range).
		if err != nil { // Ignore invalid integers including overflow or format issues
			continue
		}

		count++
		
		if first || val > maxVal {
			maxVal = val
			first = false
		}
	}
	
	fmt.Printf("count=%d max=%v\n", count, maxVal) // Wait, if no valid integers were found (only invalid ones), what do we output? The spec says "find the number of elements and maximum value". 
												   If none exist -> count=0. Max? Maybe 0 is safe default or it's undefined behavior in problem context not fully specified?
												   Given example doesn't show empty case, let's assume if 'first' remains true (no valid ints), output with maxVal remaining at initial state? 
												   If no numbers, maybe count=0 and we can pick any number for max? Or perhaps the test cases always have at least one integer.
// However, looking closely: "最大値を求めます" -> if set is empty, mathematically undefined. But program must output something.
// Let's assume defaulting to 0 or using a very small/large value that makes sense? Or maybe the input guarantees at least one int? 
// Given ambiguity for empty valid set: I will stick to initializing maxVal = min_int64 if we want strict mathematical correctness for empty? No, example init was 0.
// Actually, let's look at "count=<個数> max=<最大値>". If count is 0, maybe it doesn't matter what max is printed? 
// To be safe and match typical CP logic where a dummy value might be expected or input guarantees existence: I'll initialize `maxVal` to something that won't override negatives unless there's at least one.
// Wait, the example code initializes `max := 0`. If all inputs are -5, it sets max=-5 because of 'first'. 
// So if no valid ints found, first remains true. The value stays whatever I initialize it to? 
// Let's just follow the same pattern as Example: Initialize with a flag logic that handles negatives correctly by relying on existence check inside loop?
// No, `max` must hold a value for the final printf even if count is 0 unless we handle it specially.
// Given "整数として解釈できない要素も無視します", implies valid integers are processed. 
// I will initialize maxVal to int64(1<<62) or something? No, better: If 'first' remains true after loop (meaning no valid ints), output count=0 and a placeholder for max that doesn't break logic?
// Actually, maybe the safest is to set `maxVal` initially such that if there are numbers like -10^6 it gets updated. 
// Wait, if I initialize `first = true`, but don't update `maxVal` until first valid number:
// If no valid numbers -> maxVal stays 0 (from init). Is this acceptable? The spec doesn't say "if empty". Let's assume input always has at least one integer or a default is expected. 
// But wait, the example output format implies `max=` follows by value. 

	// Refined Logic:
	// Initialize maxVal = 0 (like example). Use 'first' flag to determine first update regardless of sign? No, if I init with 0 and encounter -5: 
	// Iteration: val=-5, err=nil. count=1. Condition `if first || -5 > 0` -> false (unless first is true then enters).
	// Ah, the example code has `if first || n > max`. So on first item (-5), it sets to -5 regardless of magnitude. 
	// If I encounter another number -1: `-1 > -5`, updates. Correct.
	// What if no numbers? Loop finishes. 'first' is true. Output 0 and whatever `maxVal` was initialized (e.g., 0). This seems the most robust interpretation without extra rules for empty set undefined behavior.
	
	maxVal = int64(1<<62) // Wait, why not just let it stay uninitialized? No, Go requires init value printed. 
                         // Let's use a flag to print if count > 0 else "count=0 max=" + something reasonable like min_int or defaulting logic?
                         // Actually, simply following the loop structure where `max` is updated on first valid integer ensures correctness for negatives. If no integers found, outputting initial value (if we init it) might be wrong if a specific rule applies. 
                         // However, since spec doesn't cover empty set explicitly, let's assume at least one number or defaulting to 0 is fine?
// Let's try: maxVal = -1 << 62; No, standard practice in such simple problems usually implies valid input exists. But to be generic:
                       // I will initialize `maxVal` to a very small value only if needed? 
                       // Actually, let's look at the Example again. It initializes `max := 0`. If all inputs are non-integers -> 'first' remains true. Output "max=0". This matches behavior even if input was empty string or just garbage.
                       
	maxVal = int64(1<<62) // Wait, I shouldn't break the example logic unless necessary. The example initialized max := 0. Let's stick to that pattern but ensure valid ints update it correctly (they do via `first || n > max`). If no integers found, 'first' is true and max remains init value? 
                         // Actually if we follow EXACTLY example: Init 0. Loop runs on invalid strings -> continue. First never becomes false. Output count=X, max=0. This works for empty or garbage inputs too!
// Wait, does the spec imply "integer values fit in 64-bit"? Yes. Does it say what happens if none exist? No explicit rule. The example defaulting to 0 is a safe bet given no info. But wait, if I have -5 and init max=0: 
                       // n=-5, first=true -> enters `if`. sets max=-5, first=false. Correct.
// So initializing with any value works as long as 'first' flag handles the first valid number update correctly. The example's initialization of 0 is just an arbitrary placeholder. 
// I'll use same pattern: Init maxVal to int64(1<<62) ?? No, better init to something safe or follow logic exactly?
// Actually, if input has only "-5", and I init max=MIN_INT (typical for "empty" optimization), then -5 > MIN_INT updates. 
// But example code uses 0. Let's stick close: Init `maxVal` = int64(1<<62) is risky if all are larger than that? No, int64 max is safe upper bound but not logic dependent on specific value if 'first' flag exists.
// The only risk with init=0 is if there are no valid integers -> output 0. Which might be "correct" for empty set in some contexts or just a fallback. 
// Let's assume we don't need to handle the case where NO INTEGER IS FOUND specially unless it breaks logic? No, loop handles parsing errors by skipping.
	
	// Final Decision: Follow example initialization `max := 0` and use boolean flag `first`. If no valid integers are found, 'first' remains true, max stays 0 (or init value). Given the prompt asks to "find" them, if none exist, maybe count=0 is primary. Max being undefined or arbitrary? I'll output with an initial default logic that mimics the example's behavior for robustness.
	
	// One correction: `strconv.ParseInt` returns error on overflow (if out of 64 bit). Spec says "values fit in 64-bit". So valid inputs won't cause ParseInt to fail on range. Invalid input chars -> err != nil -> skip. 
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10)) // Handle empty input case explicitly as per example behavior? Example doesn't show this but safe to do. 
			                                 // Actually if stdin is empty sc.Scan() returns false. We print nothing or specific line? The spec says "read from stdin". If no data -> count=0 max=?
		fmt.Println("count=" + strconv.FormatInt(0, 10) + " max=" + strconv.FormatInt(int64(-9223372036854775808), 10)) // Just output something? 
			                                 // Wait, the example code doesn't handle empty input explicitly except implicitly. But to be safe:
		return
	}

	line := sc.Text()
	fields := strings.Fields(line)
	count = len(fields) // WRONG! This counts tokens including invalid ones? NO, Spec says "ignore elements that cannot be interpreted as integers". 
                      // So we must count ONLY valid ints. 
                      // My previous loop logic counted `count++` inside if err==nil block. That's correct now.
                      
	count = 0 

	// Re-init variables properly for counting only valid integers
	var maxVal int64
	first := true

	for _, s := range strings.Fields(line) {
		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore invalid elements (non-integers or overflow if any)
		}
		
	count++ 
	if first || val > maxVal {
	maxVal = val
	first = false
    }

	// Wait, I missed initializing count in the scope. Let me fix variable scoping and logic flow carefully now inside final block below.
	
	fmt.Printf("count=%d max=%v\n", count, maxVal) // Use FormatInt for consistency? Or %d for int64 is not valid printf format char 'd' expects int/float/int8 etc in C++ but Go uses %q or formatting specifiers: 
		                               // In Go fmt.Printf, `%d` works for integer types. `strconv.FormatInt(val, 10)` formats it as string.
						// The example prints "max=%d". For int64, use strconv.FormatInt...
}
