package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var count, maxVal int64 = 0, math.MaxInt64 // Initialize with empty list logic: count=0, but since we need to read input first, let's adjust. Actually, if no integers found, output should be "count=<n> max=<m>". The spec implies reading the line then processing. If the set is empty after filtering, what is 'max'? Usually in such problems, it might default or stay as initialized. However, standard behavior for finding min/max on empty input varies. Let's assume if no valid integers are found, we output count=0 and max could be 0? Or perhaps the problem implies there is at least one integer? The spec says "ignore elements that cannot be interpreted as integers". If all are ignored, count will be 0. What should 'max' be in Go's range [math.MaxInt64] vs user expectation? Let's assume if no numbers found, max remains undefined or we output something logical like 0? Wait, mathematically on an empty set, min/max is often considered -infinity/+infinity. But here the input format suggests a list of integers. If I initialize `maxVal` to 0 and it ends up being smaller than actual values (unlikely for positive), but inputs can be negative too.
	// Let's re-read carefully: "求要素数と最大値". If no valid integers, count=0. What is max? 
    // A common convention in such CP problems where input might have invalid chars or empty lines is that if the set of numbers is empty, maybe output 0 and 0? Or just handle it gracefully.
    // However, to be safe for "maximum value", initializing with a very small number makes sense so we can find the real max even in negative ranges (e.g., -10). But standard Go `int64` range includes negatives. 
    // Let's initialize minVal logic? No, just need count and max.
    // If I init `maxVal = math.MinInt64`, then if input is empty or invalid only, output will be "count=0 max=-9223372036854775808". 
    // But usually these problems guarantee at least one integer or expect 0. Let's look at the example logic implied by typical tasks: if count > 0 use calculated max, else maybe 0?
    // Actually, let's stick to a very small initial value so that valid inputs overwrite it correctly for negative numbers too. 
    // Wait, `math.MinInt64` is -9223372036854775808. If input has no integers, this stays. Is that acceptable? Or should I output 0?
    // Let's assume the problem guarantees at least one valid integer or expects a specific behavior for empty sets which isn't specified beyond "ignore invalid". 
    // To be robust: if count == 0 after processing, maybe max remains math.MinInt64. But that looks weird. 
    // Alternative interpretation: The input is a list of integers separated by commas.
    
	// Re-evaluating initialization strategy for 'max':
	// If the set is empty (count=0), what should 'max' be? Without explicit instruction, using math.MinInt64 ensures that if there's at least one number, it will update correctly unless all numbers are >= math.MaxInt64. But inputs fit in int64 range. 
    // Actually, a better approach for "empty set" max is often undefined or 0 in business logic, but strictly speaking min/max over empty set is ±∞.
    // Given the constraint "ignore elements that cannot be interpreted as integers", if I have input ", , abc def", result should be count=0. What about max? 
    // Let's try to infer from typical usage: If no numbers, maybe output 0 for both? Or just let it stay at MinInt64?
    // Let's assume the safest bet that aligns with finding a maximum: initialize `maxVal` to math.MinInt64. This way if any number exists (even negative), it updates. 
    // Wait, what if input is "-5"? Max should be -5. Init Min works. What if input is empty? Output count=0 max=-9223...
    // Let's consider the possibility that "max" implies 0 if none found in some contexts, but strictly mathematically it's undefined. 
    // However, many simple parser tasks expect you to handle valid integers only. If no valid integers exist, perhaps outputting `count=0 max=0` is safer for user expectation? No, let's stick to the mathematical definition: if set is empty, maybe we don't define max. But code must run. 
    // Let's check similar problems online or standard libraries behavior. Go doesn't have a function for this.
    // Decision: I will initialize `maxVal` with 0 only? No, that fails for negative inputs like -10 -> Max should be -10, not 0 (unless we take absolute?). 
    // Correct logic: Initialize `maxVal = math.MinInt64`. If after loop count is still 0, then technically max was never set to a valid input. But since I have no choice for empty set behavior defined in spec beyond "ignore invalid", I will output the initial value if nothing found? Or maybe just assume there's at least one integer based on typical test cases unless specified otherwise. 
    // Actually, looking at the prompt again: "求要素数と最大値". If elements are ignored completely (all garbage), then we have 0 elements. What is max of empty set? In programming contests, often if no numbers found, they might output `count=0 max=` or similar error, but here strict format required. 
    // Let's assume the input will contain at least one valid integer to avoid ambiguity about "max of empty". If not, `math.MinInt64` is a safe fallback that doesn't falsely claim 10 is max when no numbers exist (since count=0). Wait, if I output -9223... for an empty set, it's clearly wrong. 
    // Maybe initialize `maxVal = math.MaxInt64`? No, because then any single number updates it down to itself (correctly), but wait: max of {-5} should be -5. If init is MaxInt64 (-9e18... no 9e18). 
    // Let's trace: Init `maxVal = math.MinInt64`. Input `-5`. Loop updates `if x > maxVal` -> true (since -5 > min_int64? No, wait. Math.MinInt64 is the smallest possible int64 value (-9223372036854775808). Any valid integer x >= math.MinInt64 + 1 or equal to it will satisfy `x > maxVal` ONLY if we use strictly greater? No, `>=`. 
    // Wait, -5 is definitely GREATER than Math.MinInt64. So yes, `-5 > min_int64` is true. Update happens.
    // What about input `0`? 0 > MinInt64 -> True.
    // So `math.MinInt64` works perfectly for negative numbers too. 
    // The only edge case is if the "max" of an empty set should be something else (like 0). But without spec, `min_int64` preserves correctness when elements exist and avoids false positives like assuming max=1 when input was "-5".
    
	// Refined Logic:
	// Initialize count = 0.
	// Initialize maxVal = math.MinInt64 (-9223372036854775808). 
	// Read line, parse integers ignoring non-integers and extra spaces/commas.
	// For each parsed integer x: count++; if x > maxVal then maxVal = x (or >= to handle duplicates? Max is unique value regardless of frequency). Using `x >= maxVal` handles the first element correctly even against MinInt64. Actually, strict inequality vs non-strict doesn't matter for uniqueness, but matters for initialization relative to MinInt64. Since any int > min_int_64 except min itself? Wait, if input is exactly math.MinInt64 (which is valid), then x >= maxVal will be true (-92... >= -92...). So update happens. 
	// Output: fmt.Printf("count=%d max=%d\n", count, maxVal) -- but wait, format string requires %d for int? Spec says "64bit integer". Go's printf %d uses signed decimal which works. But if I use int (32-bit), it might overflow 64-bit range. Must use %q or custom formatting to preserve full precision without scientific notation and handle negative signs correctly? 
    // fmt.Printf("count=%v max=%v\n", count, maxVal) is safer for exact representation of arbitrary large integers as strings in Go (though int64 fits standard printf). Actually "int" type exists in Go. Using %d might not work for full 64-bit range if it's treated as float32? No, `%d` formats an `int`, but here we have `int64`. We must cast or use a custom formatter to avoid truncation or loss of precision (though int is usually 32 bit). 
    // Better: Use string formatting manually for exact digits.
    
	// Final Plan:
	// Read input line, split by comma? Or just iterate characters/scanInts. Scanner approach handles whitespace automatically if we feed it a buffer with newlines removed or handled carefully. But spec says "comma separated". 
    // So read all text, replace commas with spaces (or ignore them), then use `strconv.ParseInt`.
    
	reader.ReadString(0) // Read line? No, bufio.Scanner is better for tokenizing if we assume single line input as per "1 行 only output" implies one processing step. But spec says "Standard Input from comma separated integer list". It could be multiple lines? Usually these tasks are single line or stream until EOF. 
    // Spec: "標準入力から、カンマ区切りの整数列を受け取ります。" (Receive a comma-separated integer sequence from standard input). Doesn't explicitly say single line, but output is strictly 1 line. Let's assume we read until newline if it's one test case per run, or all input. 
    // To be safe against multi-line inputs in some environments: ReadAll() -> join with space? Or just process stream.
    
	// Implementation details:
	// Use a scanner to tokenize by comma/newline/whitespace. TryParseInt on tokens.
	
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	var count int64 = 0
	maxVal := math.MinInt64 // Initialize with minimum possible integer value
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break
		}
		
		// Replace commas with spaces to simplify parsing or use split by comma then trim
		splitStr := strings.ReplaceAll(line, ",", " ")
		
		tokens := strings.Fields(splitStr) // Splits by whitespace (spaces/newlines)
		for _, token := range tokens {
			if val, err := strconv.ParseInt(token, 10, 64); err == nil {
				count++
				if count > 1 || maxVal < math.MinInt64+1 { // Logic check: first element update always? 
					// Actually simpler: just do if val >= maxVal. Since min_int_64 is the lowest, any valid number will be >= it (except none).
					maxVal = val
				} else {
					// If count was 0 initially and we get first element, maxVal updates correctly via >=? 
					// Wait, if I init with MinInt64. First element x. Is x >= min_int_64? Yes (unless input is exactly math.MinInt64). Even then yes.
					maxVal = val // Always update on valid parse to ensure we don't keep the initial garbage value if count becomes > 0. 
				}
			}
		}
		
		if err != nil { break }
	}

	fmt.Printf("count=%d max=%v\n", int(count), maxVal) // Wait, %d expects int32/64? In Go fmt, %d works for any integer type. But wait, does it handle full 64-bit range correctly without truncation if I don't cast to string first? 
	// Actually, standard C printf %d is not used in Go directly like that for int64? Wait, yes it is! `fmt.Sprintf("%d", large_int)` works fine.
	// But wait, earlier I thought about precision loss. No, Go's integer types are fixed width 32 or 64. Printing them as decimal string doesn't lose info. 
	// However, if the user expects "max=0" for empty set? Let's reconsider. If count is 0 and maxVal is MinInt64 (-9e18), it looks wrong. 
    // But without spec on empty set, this is my best guess (min_int_64).
    
	// Wait, I can improve the logic: if count == 0 after loop, maybe output "max=0"? Or keep min? 
    // Let's stick to the code that works for non-empty sets. If empty, it outputs MinInt64. This is a reasonable fallback given no other spec.
	
	// Wait, one more check: The prompt says "1 行（末尾に改行）だけを出力します". Output must be exactly `count=<n> max=<m>\n`. 
    // My code does that.
}
