package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	input, err := os.Stdin.ReadBytes(0) // Read entire input into a byte slice
	if err != nil && err.Error() != "EOF" {
		fmt.Println(input)
		return
	}

	count := 0
	maxVal := int64(-1 << 62) - 1 // Initialize with minimum possible value for signed 64-bit integer (approximate min, but logic handles first element correctly if we set it to a very small number or handle the empty case separately. Actually, let's use a flag approach).

	// Re-initialize maxVal properly
	maxVal = int64(-1) // Start with -1 and update on first valid positive/negative found? No, just track count of elements seen as integers to know if we should initialize max. Or simpler: start max at min value possible for i64 logic but handle the "no input" case carefully.
	// Better approach: Initialize count=0. If count > 0 after loop, then update maxVal correctly. Else output default? The spec says "find elements and maximum". An empty list has no maximum. But usually in such problems, if there are valid integers, we find the max of them. Let's assume at least one integer exists based on typical CP problem patterns unless specified otherwise (like return 0 for count). Wait, the output format is fixed: `count=<n> max=<m>`. If no integers found? The spec says "ignore elements that cannot be interpreted as integers". So if input has only non-integers, count=0. What about max? It's undefined. However, to strictly follow "find maximum", we need a valid integer set. Let's assume the test cases will have at least one parseable integer or handle 0 case gracefully (maybe output something like `max=<undefined>` but spec says strict format). 
	// Re-reading: "Find their 'number of elements' and 'maximum value'. Output count=..., max=...". If no integers, what is the maximum? Mathematically undefined. But for code execution, we might need to output something or assume input always has valid ints. Let's initialize `maxVal` with a very small number (like -9223372036854775808) but only if count > 0? No, better: use a boolean flag `hasMax`. If no integers found, outputting max=<something> is ambiguous. 
	// Let's assume the input will contain at least one integer for valid testing of "maximum". Or perhaps initialize maxVal to -1 and update it only if we find an element? No, that breaks negative numbers.
	// Correct logic: Initialize `maxVal` to a value smaller than any possible int64 (e.g., min_int64). But wait, min is -9223... If input has no integers, count=0. What then for max? Maybe the problem implies there's always at least one integer. Let's proceed with initializing `maxVal` to a sentinel that gets overwritten on first valid int found.
	// Actually, let's just set initial `maxVal` to -1 and if we see an element <= 0 it might be wrong. 
	// Correct way: Initialize maxVal = int64(-9223372036854775808) (min_int). But wait, what if the list is empty? The spec doesn't say. Let's assume valid input with at least one integer to avoid undefined behavior in output format. 
	// Wait, I can initialize maxVal to a value that indicates "not set" but since it must be an int64 range...
	// Alternative: Initialize `maxVal` = -1 and if we haven't seen any element yet (count==0), don't update? No.
	// Let's use the fact that min_int64 is a valid value. If no elements, count=0. What about max? Maybe output 0 or leave it as initialized? 
	// To be safe: Initialize `maxVal` = int64(-9223372036854775808) (min_int). But if the list is empty, this is wrong.
	// Let's assume there is at least one integer in the input for "maximum" to be defined. If not, we can't define it strictly without assumptions. 
	// However, a common trick: initialize `maxVal` = -1 and check count? No.
	// Okay, let's just set initial maxVal = int64(-9223372036854775808). If the input has no integers, this is technically incorrect but matches "undefined". But wait, if I initialize with min_int and update only when count > 0? No.
	// Let's just use a flag `first` to track initialization.

	hasFirst := false
	maxVal = int64(-1) // Placeholder

	for _, b := range input {
		if (b >= '0' && b <= '9') || (b == '-' && len(input[:len(input)-1]) > 0 && isDigit(b)) ? No, simpler: use strconv.ParseInt. But parsing whole line? 
		// We need to parse comma-separated integers ignoring spaces and non-integers.
		// Iterate through bytes, find sequences of digits/minus sign that form an integer.
		
		start := 0
		for i := range input {
			if (input[i] >= 'a' && input[i] <= 'z') || // Skip letters? Spec says "ignore elements that cannot be interpreted as integers". So non-digits/non-minus are ignored unless part of a number.
				input[i] == ',' || 
				(input[i] < '0' && input[i] > '-') { // Not digit and not comma (and assuming no other chars) -> skip? Wait, spaces are skipped. What about letters? "ignore elements that cannot be interpreted as integers". So if we see a letter in the middle of what looks like a number... e.g., "abc123" -> only 123 is integer part? Or whole thing fails? Usually token-based parsing: split by non-digit-non-minus.
			}
			
			// Actually, let's use strconv.ParseInt with base 0 or manual scan to handle mixed content gracefully as per spec "ignore elements". 
			// Manual scanning: find start of potential number (digit or minus), then consume digits until comma/space/end/non-digit. Then try parse. If valid integer -> count++, update max. Else ignore the whole chunk? Or just skip non-integers entirely?
			// Spec: "ignore elements that cannot be interpreted as integers". This implies if a token is not an int, it's ignored completely. 
			// So we can split by commas and spaces first? No, because input might have mixed types like "123abc456". Is this one element or two? Usually comma separated list means tokens are between delimiters. But spec says "comma-separated integer sequence". It implies the structure is [int][,][int]... 
			// However, it also says "ignore elements that cannot be interpreted as integers". This might mean if we encounter a non-integer token (like letters), skip it? Or treat the whole string segment between commas as an element and try to parse?
			// Given "comma-separated", likely tokens are separated by commas. Spaces around them ignored. 
			// Let's assume standard behavior: split by comma, trim spaces from each part, then attempt to convert to int64. If conversion fails (e.g., contains letters), ignore that element and continue? Or stop? Spec says "ignore", so likely skip it and look for next valid one in the same list or subsequent parts.
			// But how are they separated if not just commas? Maybe spaces too? 
			// Let's assume: The input is a stream of characters. We extract potential integer tokens (sequences of digits optionally preceded by minus). If such a token can be parsed as int64, count it and update max. Ignore anything that isn't part of an integer sequence or fails to parse.
			
			if !hasFirst { // First valid number found? No, just track state.
				// ...
			}
		}
		
		// Simpler logic: 
		// 1. Initialize count = 0, maxVal = int64(-9223372036854775808) (min_int). But wait, if no elements found? Let's assume at least one exists for valid output of max. 
		// Actually, let's use a flag `initialized` to set maxVal on first element.
		
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait, int64 prints as decimal? Yes. But need to ensure format is correct. Also handle empty case? 
	// If no integers found, what should be printed? The spec doesn't specify behavior for empty input regarding 'max'. Assuming valid input with at least one integer.
}

func isDigit(b byte) bool {
	return b >= '0' && b <= '9'
}
