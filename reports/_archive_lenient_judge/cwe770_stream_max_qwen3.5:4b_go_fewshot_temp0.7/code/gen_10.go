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
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10)) // Empty input case handled gracefully? Or should it be error? Let's assume valid input per spec. But to be safe for empty: count=0 max=? Max of what if none exists? Usually undefined or initial value. The example used init with first flag.
		fmt.Println() 
		return
	}

	input := sc.Text()
	maxVal := int64(0) // Initialize min possible? Or handle "no valid integers"? Let's follow the logic from Example 1 which initializes max=0 and checks 'first'. But wait, if all numbers are negative, initializing to 0 might be wrong. 
	// Re-evaluating: The example initialized `max = 0` but used a flag `first`. This implies it assumes at least one integer exists or treats empty as error?
	// Actually, looking closely at Ex1 code logic: if no integers are found (loop finishes without setting max because all were invalid), then 'first' remains true and max stays 0. 
	// Is that the desired behavior for "no valid ints"? The spec says "values fit in 64bit integer". It doesn't explicitly say what to do with empty input or no integers.
	// However, usually in such problems if there are no numbers, count=0 and max is undefined. 
	// Let's look at the constraints: "integer sequence comma separated". If I get "-5", it should work.
	// So initializing `max` to a very small number or using logic similar to Ex1 but ensuring correctness for negatives?
	// The provided Example 1 code sets max=0 and uses 'first' flag. This means if input is " -2 ", count=1, max=-2 (correct). If input is empty string, loop doesn't run, first=true, outputs count=0 max=0. 
	// Is this correct? Technically undefined. But since the prompt asks to follow the format of examples and Example 1 uses that specific pattern for finding max even with potential negatives implicitly (by checking `n > max` against an initial value), I will replicate the logic but ensure it handles negative numbers correctly by initializing max appropriately OR relying on the 'first' flag check before assignment.
	// Wait, Ex1: if input is " -5 ", first=true -> sets max=-5, first=false. Correct. If input is empty? Loop doesn't run. Output count=0 max=0. This seems to be the intended behavior based on the provided example's logic. I will stick to that structure but perhaps initialize max to a safe default or just let it stay 0 if no valid ints found (assuming at least one int exists per "sequence" context, though strictly empty input is possible).
	// Better approach for robustness: Initialize `max` to the smallest 64-bit integer? No, that requires importing math/big or knowing limits. 
	// Actually, standard practice in such coding problems when using a flag like 'first' is exactly what Ex1 did: start with max=0 (or any placeholder) and only update on first valid number if it's smaller/larger appropriately.
	// Let's refine the logic to be safe for negative numbers without hardcoding min int64 value? 
	// Actually, `int64(<<>>)` isn't easy without constants or math package (which is allowed). But simplest is: initialize max to 0 and use 'first'. If input has negatives like "-1", -1 > 0 is false. So it won't update if first is true? 
	// Ah, the Ex1 code says `if first || n > max`.
    // Case " -5 ": f="-5". Atoi -> -5. first=true OR (-5 > 0)? True updates max=-5. Correct.
    // Case " 3 -5 ": First '3': 3>0, sets max=3. Then '-5': -5 > 3 False. Stays 3? WRONG! Max should be 3. Wait, if input is "-5", it works because first=true triggers update regardless of value comparison.
    // What about "3"? '3' -> first=true OR 3>0. Sets max=3. Correct.
    // So the logic `if first || n > max` handles negative numbers correctly as long as the FIRST number is processed and sets max to it, regardless of whether it's greater than an arbitrary initial zero or not? 
    // Yes! Because on the very first valid integer encountered, `first` is true, so condition passes, updates max. Subsequent integers only update if strictly larger.
    // This works perfectly for negative numbers too because the "first" logic overrides any comparison with a potentially invalid initial value (like 0 or min). 
    // So I will copy this exact logic pattern from Example 1 to ensure correctness and consistency with the provided style.

	count := 0
	
	for _, w := range strings.Split(input, ",") {
		w = strings.TrimSpace(w)
		if len(w) == 0 || !strings.ContainsRune(w, '-') && (w[0] >= 'a' || w[0] <= 'z') { // Wait, Atoi handles signs. Just parse and check error? 
			continue // Skip empty or non-integer tokens
		}

		n, err := strconv.Atoi(w) // Note: Atoi might fail if not integer string (e.g., "abc") but spec says ignore such elements. Go's strconv.Atoi returns 0 for invalid format usually? No, it panics on overflow and errors on non-numbering chars except leading/trailing garbage? Actually strconv.Atoi reads as much as possible until failure or EOF. It parses "-123abc" to -123 in some languages but CGo might differ. 
		// To be strict "integer as interpreted", we should use Atob/ParseInt with base 0 which accepts octal/hex? Or just standard Atoi and check error.
		if err != nil {
			continue // Ignore invalid integers like non-numeric strings or overflows (overflow returns bool false + overflow flag, but here n is int64)
		}

		count++
		
		if count == 1 || n > maxVal { 
			maxVal = n
		}
	} 
	
	fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait, if no integers? Count=0. MaxVal stays whatever init was. If I set maxVal to int64(0), and input is empty or all invalid -> output 0. 
	// Is this acceptable? The problem says "integer sequence". Usually implies non-empty valid data. But if strictly following Ex1, yes.
}
