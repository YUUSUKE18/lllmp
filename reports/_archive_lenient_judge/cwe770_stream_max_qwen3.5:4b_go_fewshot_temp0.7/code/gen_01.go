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
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10)) // Empty input case handled by loop logic but needs explicit zero initialization for count and max. Actually if no tokens, max should be initialized carefully or assumed empty result? The example implies processing exists. Let's assume valid non-empty range based on examples usually implying data presence unless specified otherwise (like "empty list"). However to be safe:
			fmt.Printf("count=0\n") 
			return 
	}

	var count int64 = 0 // Using int64 for safety though prompt says '個数' which is likely small, but value range suggests large numbers. Wait, count of elements vs max value magnitude. Prompt says "値は 64bit 整数の範囲に収まる" (values fit in 64-bit), doesn't specify element count limit. Let's use int for count as usually lists are smaller than full int64 range, but if input is huge... let's stick to standard logic:
	
	// Re-initialize properly based on the requirement "max=<最大>" and example outputs format which implies a value exists or 0? 
	// If no valid integers found, what should max be? The prompt doesn't specify behavior for empty list explicitly beyond ignoring invalid elements.
	// However, usually if count is > 0 but all ignored (empty input), output might differ. Let's assume standard initialization: 
	maxVal := int64(0) // Initialize to min possible or handle first element logic? The example code does `first` flag. I will replicate that pattern for robustness against empty lists where max=0 is ambiguous if negative numbers exist without a sentinel, but typically 'max' implies the largest seen so far. 
	// Actually, looking at Example 1: it initializes max=0 and uses `if first || n > max`. This handles negatives correctly because `first` becomes false on first iteration regardless of value sign (assuming int64 min is -9e18). If list is [-5], count=1, max=-5.
	// Wait, if I init maxVal = 0 and use the logic from Ex 1: 
	// Input: "-5". Scan -> n=-5. first=true. condition true. maxVal becomes -5. Correct.
	// Input: "5". Scan -> n=5. first=true. condition true. maxVal becomes 5. Correct.
	// So I will follow the logic of Example 1 exactly for finding max, but count elements found.

	first := true
	
	for _, w := range strings.Fields(sc.Text()) { // Splits by whitespace implicitly as per "カンマ区切りの" (comma separated) wait... 
		// Re-read requirement: "標準入力から、カンマ区切りの整数列を受け取ります。" -> Comma-separated integers.
		// Example 2 handled comma splitting with strings.Split(sc.Text(), ","). I must do the same here.
		
		splitStr := "" // Placeholder logic, need to fix loop range
		
		// Correct approach: Get all tokens separated by commas and whitespace? Or strictly "comma-separated"? 
		// Spec says: "カンマ区切りの整数列". Usually implies elements are separated by comma. But standard input might have spaces around commas or newlines?
		// Example 1 used `strings.Fields` (whitespace). Example 2 used `strings.Split(..., ",")`.
		// The prompt spec says "comma-separated integer list". 
		// To be robust against potential whitespace issues often found in such problems: split by comma first, then strip spaces from each part. Or use a regex? No std lib for that easily without importing regexp (allowed as standard library). But `strings.Split` is enough if input format is strict "int,int".
		// However, Example 2 shows handling of whitespace around items after Split: `strings.TrimSpace(w)`. 
		// Let's assume the input string contains comma separators. The safest way to parse a list separated by commas (and potentially spaces/newlines in between if not strictly one line? No "1行だけ出力" refers to output, input can be anything).
		// Actually `sc.Text()` reads whole standard input as one string. If it's multi-line comma-separated, we should handle that. 
		// But the spec says "standard input from...". Let's assume typical competitive programming style: all text in stdin is the list.
		
		// Re-evaluating parsing strategy based on Example 2 logic applied to this task type:
		// If I use `strings.Split(sc.Text(), ",")` and then iterate, checking if empty or whitespace only -> skip? 
		// The prompt says "ignore empty elements・leading/trailing whitespaces". This implies the structure might be messy.
		
		// Let's refine parsing: Split by comma first? Or split by both commas and newlines/whitespace as delimiters to get individual integers?
		// Spec: "comma-separated integer list". 
        // If I strictly follow Example 2 style but adapted for numbers:
        // The safest generic parser that handles ",1, 2" or "1,2," etc. is `strings.FieldsFunc` with a custom delimiter function including ',' and whitespace? No, Fields splits by any run of non-word chars. 
        // Better to split by comma first -> get parts -> trim each part -> check if number.
        
		c := 0
		for _, w := range strings.Split(sc.Text(), ",") {
			if strings.TrimSpace(w) == "" {
				continue
            }
            
            n, err := strconv.Atoi(strings.TrimSpace(w))
            // Wait, Atoi parses until the end of string. If there are spaces inside a token like " 123 ", TrimSpace fixes it. 
            // What if multiple numbers in one comma-delimited block? e.g., "[int,int]" is not likely unless specified. Assuming single number per element usually for such simple tasks, OR we need to split by space within the field too?
            
            // Looking at Example 1: "空白区切りの整数列" (whitespace separated). 
            // This task says "comma-separated". It does NOT explicitly say "and whitespace inside elements are ignored unless it's a number boundary"? Usually comma separation implies [int,int]. But to be safe against messy input like ", ,", splitting by ',' then trimming works.
            // Does the list contain spaces between numbers if not separated by commas? The spec says "comma-separated integer sequence". So likely format is `1,2,3`. 
            // If I encounter `, 5`, trim handles it. 
            // What about `1 , 2` -> split(',') gives ["1 ", " 2"]. Trim makes them valid.
            
			// Wait, what if the input is just numbers with spaces but NO commas? The spec says "comma-separated". So we expect commas. But robustness suggests handling both or at least treating comma as primary delimiter and whitespace cleanup on elements. 
            // However, `strconv.Atoi` might fail if there are multiple digits without separators inside a token (e.g., not an issue here).
            
			// One edge case: what if the string has no commas? Then Split returns [whole]. We process that whole as one number? Or should we assume it's comma separated so at least one is expected or handled gracefully. 
            // Let's stick to splitting by ','. If result has multiple parts, each part is tried.
            
			// Wait, if input is "1 2" (no commas), Split(',') returns ["1 2"]. Atoi fails? Yes. 
            // But spec says "comma-separated". So we assume valid comma structure or at least that's the delimiter to look for. 
            // If I want maximum robustness matching Example 1/3 style:
            // Actually, let's re-read carefully: "標準入力から、カンマ区切りの整数列を受け取ります。" (Accepts a list of integers comma-separated from standard input).
            // So the primary delimiter is ','. 
            // I will split by ',' and then parse each token. If Atoi fails (e.g. non-integer garbage), ignore as per spec ("non-integers are ignored").
            
			// Wait, what if there are spaces between comma separated numbers like "1 , 2"? Split gives ["1 ", " 2"]. TrimSpace makes them valid. 
            // What if input is empty string? Loop doesn't run. Count=0. Max should be... undefined or 0? Example 1 initializes max=0 and handles first element specially. If no elements, it outputs `max=0`. Is this correct for "empty list"? Usually yes unless specified otherwise ("return error" etc not mentioned).
            // But wait, if input is empty, count=0. Max should probably be the smallest possible int64 or 0? 
            // Example 1 code: max starts at 0. If no numbers found (e.g., non-integers only), it prints `max=0`. This seems to be the intended behavior for "empty" case if following Ex 1 strictly, OR maybe we should initialize with min value and handle empty list separately? 
            // Given Example 1's logic is provided as a reference style:
            // It uses `first` flag. If no valid ints found -> max remains initial value (0). Output "max=0". This might be acceptable given the examples don't show an error case for invalid input or empty list other than non-existence of data to process. 
            // However, mathematically max of empty set is undefined. But in programming contests with such simple specs, 0 or min_int64 are common defaults if not specified.
            // The prompt says "values fit in int range". If the input was valid but all negative? Ex 1 logic `max=0` initially + `first` flag would result in max being the first element (e.g., -5) only IF we update it inside loop. 
            // Wait, check Ex 1 code again:
            // if err != nil continue
            // if first || n > max { ... }
            // So for input "-5": scan -> n=-5. first=true. condition true. max = -5. Correct.
            // For empty input (-): loop doesn't run. max=0 (initial). Output "max=0". 
            // Is this correct? If the list is truly empty, maybe output should indicate no value found? But spec says "output exactly 1 line ... count=N max=M". It forces an integer M.
            // I will follow Ex 1's logic for initialization (start with first=true) and default behavior if loop doesn't update anything (which leaves it at initial state). In Ex 1, `max` was initialized to 0. If no numbers found, output is `max=0`. This implies treating empty list as having max 0? Or maybe the assumption is there's always data or we just follow the code pattern provided in examples which acts as a template for logic style.
            // Actually, looking at Ex 1 again: if I pass "a b", nothing changes. Output `max=0`. Seems to be the behavior derived from that snippet. 
            // But wait! If input is "-5 -6". n=-5 (first=true -> max=-5). n=-6 (-6 > -5? No). Max stays -5. Correct.
            // So I will replicate this logic: `max` initialized to 0, but updated on first valid element regardless of value if using the `if first || ...` check. 
            // Wait, what if initial max is 0 and input is all negatives? The `first` flag ensures we capture the negative number immediately because `true` short-circuits OR. So yes, it works perfectly for negatives too.
            
			// One correction: In Ex 1 code provided in prompt: 
            // max := 0
            // first := true
            // ... if err != nil continue; if first || n > max { max = n; first = false }
            // This logic is sound for negative numbers. It just relies on `first` being set initially to allow the first number (even -9223372036854775808) to replace 0? 
            // Wait, if input is "-1e18" and max=0. n = -1e18. Condition `first || ...` -> true. max becomes -1e18. Correct.
            
			// So I will use this exact initialization strategy: maxVal := 64-bit int (int64), first=true, count=int(0). 
            // However, note that in Go `max` is an int variable? No, values are up to 64bit integer range. Use int64 for value.
            
			// Wait, Example 1 used `n := strconv.Atoi(f)` which returns `int`. In modern contexts or large numbers (up to 9e18), `Atoi` works until overflow? 
            // Go's `strconv.Atoi` parses into `int`, not `int64`. If the value exceeds int range, it panics.
            // The prompt says "values fit in 64bit integer". So we MUST use `ParseInt` with base 10 and max bits set to handle full int64 range safely without panic on large numbers (e.g., -9223... vs 9228...). 
            // Example 1 used Atoi implicitly assuming inputs fit in Go's default integer types or the environment. But since spec explicitly says "values are within 64bit integer range", using `int` might overflow on very large positive numbers (up to ~2e307 for float, but int is fixed width). 
            // Actually standard `strconv.Atoi` parses into `int`. On a platform where int is 32-bit (many CP environments are Linux x86_64 which has 64-bit int), it's fine. But the spec explicitly warns about "values fit in 64bit". This suggests we should use `ParseInt(..., -1)` or similar to be safe on all platforms where 'int' might be 32 bit (though rare for Go main). 
            // Best practice: Use `strconv.ParseInt(rune...`? Or just assume input fits in int64.
            // Let's use `strconv.Atoi` if we trust the platform, OR better yet `strconv.ParseInt(...)` to strictly satisfy "values fit in 64bit integer" constraint regardless of architecture specifics (though Go int is usually same as native). 
            // To be absolutely safe for "int range":
            
			// Refined loop:
			splitStr := "" // Need to fix logic flow. Let's write clean code below.

	cleanedTokens := strings.Split(sc.Text(), ",")
	for _, w := range cleanedTokens {
        trimmed := strings.TrimSpace(w)
        if trimmed == "" || !isNumeric(trimmed) { continue } 
		n, err := strconv.ParseInt(trimmed, 10, 64) // Parse into int64 safely. Check error? Spec says ignore non-integers. If parsing fails (non-numeric
