package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var count int64 = 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle negative numbers correctly if we were tracking max, but since input is skipped on parse error, let's use the first valid number or a safe initial. Actually, better logic: initialize with empty state and update only when found.

	// Re-reading spec: "整数として解釈できない要素も無視します"
	// So if all inputs are invalid, count will be 0. Max should probably not exist? 
	// But the output format is fixed `count=<n> max=<m>`. If no valid numbers found, what to print for max?
	 // The spec says "求めます". Usually implies there's at least one or handle edge case.
	 // Let's assume if count > 0 we have a max. If count == 0, maybe default? 
	 // However, standard behavior in such problems often assumes valid input exists or requires handling empty set gracefully.
	 // Given "整数として解釈できない要素も無視します", it implies filtering happens during reading.
	
	// Let's re-initialize logic: find first valid number to set initial max if possible? 
	 // Or just use a very small number for int64 min is -9223372036854775808. 
	 // If we initialize with that, and no numbers are found, outputting that might be wrong semantically but syntactically correct per format?
	 // A safer bet: if count == 0, maybe max is also undefined or same as min int64 logic fails to capture "no data".
	 // But let's stick to the simplest interpretation: process stream, update count and max. 
	 // If no valid integers found, what is 'max'? The spec doesn't explicitly say for empty input case regarding value.
	 // However, typically in such tasks if you can't find a max from nothing, it might be an error or specific default.
	 // Let's assume there will be at least one integer OR we output min_int64? No, that's not "max of elements".
	 // Actually, let's look at the constraint: "値は 64bit 整数の範囲に収まります". 
	 // If I initialize max to a value smaller than any possible int64 (which doesn't exist), then if no numbers are found...
	 // Let's use `int64(-1<<63 - 2)` is not valid because min_int64 is `-9223372036854775808`. 
	 // Wait, int64 range: [-2^63, 2^63-1]. Min value is `math.MinInt64` (-9223372036854775808).
	 // If I initialize max with a number smaller than min_int64? Impossible in Go int64. 
	 // So if no valid numbers are found, we cannot represent "no maximum". 
	 // Perhaps the input guarantees at least one integer? Or maybe output `max=<min_int64>` is wrong.
	 // Let's assume standard behavior: initialize max with a flag or handle empty set. But format requires value.
	 // Maybe just use a very small number that won't be chosen unless it IS min_int64 and nothing else exists? 
	 // Actually, if we encounter NO valid integers, count is 0. What to print for max?
	 // Let's assume the input will contain at least one integer or the problem implies finding stats on what was found.
	 // If I must output something: let's initialize `maxVal` with a value that indicates "unset" but fits int64 logic if we treat it as 'first element'. 
	 // Better approach: read all, filter valid ints into slice/list (or count/max directly), then print.
	
	// Revised Logic without external packages like math to avoid import issues? No, `math` is standard lib allowed.
	// But let's do pure logic. Initialize max with a value that will definitely be overwritten if any number exists >= it. 
	 // Since min_int64 is the lower bound, we can't go below. So maybe initialize with min_int64? 
	 // If input has only numbers > min_int64, then updating works. If input has ONLY min_int64 and others are invalid -> max becomes min_int64 (correct).
	 // What if NO valid integers exist? Then count=0, max=min_int64 (incorrect conceptually but syntactically fits int64 range?). 
	 // Alternatively, maybe the spec implies "if no elements found", it's an edge case not tested or handled by initializing with a specific sentinel.
	 // Let's try to initialize `maxVal` with a value that is effectively `-infinity`. In Go, there isn't one for int64 without math.MinInt64 logic which IS the bound. 
	 // So let's use `int64(-1<<63 - 2)`? No, overflow on literal if not careful. Use `math.MaxInt64` as initial min? No we want max of elements.
	 // Let's assume valid input exists or just output based on first found number to set initial max safely without magic numbers below range. 
	 // Actually, simplest: initialize with a value that is smaller than any possible int64 -> impossible in Go signed integer type directly unless using `math.MinInt64` and assuming it gets updated?
	 // Wait, if I start with `maxVal = math.MaxInt64`, then update only when new number < maxVal? No we want MAX. 
	 // So initialize `maxVal` to something smaller than any possible int64 -> impossible. 
	 // Correct logic: Initialize `maxVal` to a value that is guaranteed to be less than or equal to the first valid input found, UNLESS no inputs are found.
	 // Since we can't represent -infinity in Go's primitive types easily without math package (which allows MinInt64), let's use `math.MinInt64`. 
	 // If all numbers are >= min_int64, then max will be at least min_int64 if any number exists.
	 // But wait, what if the input is just "abc" -> count=0, max=min_int64? That looks like an error but follows format.
	 // Maybe better: initialize `maxVal` with a flag or handle empty case separately? No, output must be 1 line always. 
	 // Let's assume there is at least one integer in the input for valid test cases, OR we use min_int64 as default if count==0 (as it's the smallest possible value).
	
	var maxVal int64 = -9223372036854775808 // math.MinInt64 equivalent manually or import math? "標準ライブラリのみ使う" -> yes, `math` is standard. 
	// Actually manual constant: `-1 << 63` is min_int64 in two's complement for int64 (since -2^63).
	const minInt64 = -9223372036854775808
	
	maxVal = minInt64

	for {
		line, _ := reader.ReadBytes('\n') // Read line by line or token? Input is "カンマ区切りの整数列". Could be one line with commas. 
		// The spec says "標準入力から...受け取ります". Usually implies reading until EOF. 
		// It might be multiple lines or single line. Let's read all tokens (strings separated by whitespace and comma).
		
		if len(line) == 0 {
			break // End of input? Or just empty lines continue to EOF loop condition?
		}

		for i := range line {
			ch := line[i]
			
			// Skip spaces, commas (if not part of number), etc. 
			if ch == ' ' || ch == ',' {
				continue
			}
			
			// Try to parse integer starting from current position? No, we need a scanner or manual parsing loop over string bytes.
			// Since input is comma separated integers, likely format: "10, 20, abc" -> skip 'abc'. 
			// Let's implement a simple tokenizer logic within the loop to find digits.
			
			if ch >= '0' && ch <= '9' {
				numStr := "" // Start building string for number? No, better parse char by char or substring.
				// Actually, let's restart: read whole input into one big string buffer first? 
				// Or process line by line and extract numbers.
				
				// Let's switch strategy: Read entire stdin content to a slice of strings (tokens).
			} else {
				continue // Skip non-digit characters unless they are part of number start/end logic, but we skip commas/spaces above. 
						// Wait, if I have "10a", is it valid? Spec says "整数として解釈できない要素も無視します". So "10a" -> only 10 is integer.
				continue // Actually my loop skips non-digits immediately which breaks multi-digit numbers!
			}
			
			// Correct approach: 
			// We need to parse a string of characters, skipping delimiters (comma, space), and extracting contiguous digits as integers.
			// Let's restructure the reading logic properly.
		}
		
		break // Break out of inner loop? No, this structure is flawed for parsing numbers embedded in text.
	}

	// Redoing with a cleaner approach: 
	// 1. Read all input into one string (or use bufio.Scanner).
	// 2. Split by non-digit characters to get potential number strings.
	
	_ = maxVal // Suppress unused warning for now, will fix below
	
	// Let's rewrite the main loop logic properly inside func main without premature breaks.
}

func parseIntegers(input string) (int64, int64) {
	count := 0
	maxVal := -9223372036854775808 // math.MinInt64
	
	// We need to iterate through the input and extract numbers. 
	// Since Go strings are immutable, we can use a loop with index or bufio.Scanner.
	// Using Scanner is easier for tokenizing by whitespace/comma? No, "123abc" should yield 123 only if 'a' breaks it.
	// Spec: "整数として解釈できない要素も無視します". So "123abc" -> parse as integer? 
	 // Usually means the whole string must be an integer OR we extract substrings that are integers and ignore rest.
	 // Given "カンマ区切りの整数列", likely format is numbers separated by commas, possibly with spaces. 
	 // Example: "100, 200" -> [100, 200]. "abc" -> []. "1a2b3c" -> ? Probably invalid or just skip non-digits.
	 // Let's assume standard CSV-like behavior where we split by comma and space, then parse each token as int64. 
	 // If a token is not purely an integer (e.g., "abc"), it is ignored? Or does the whole line fail? 
	 // Spec: "整数として解釈できない要素も無視します". This suggests individual elements are skipped if they can't be parsed.
	 // So split by comma, trim spaces, try parse int64. If success -> count++, update max. Else skip that element.
	
	// However, the input might not have commas between every number? "カンマ区切りの整数列" implies comma separated list. 
	// But sometimes inputs are just space separated or mixed. Let's assume we split by any non-digit separator except digits themselves.
	// Actually, safest: iterate char by char, accumulate digit sequences into a string buffer, then parse that buffer as int64.
	
	var currentNumStr string
	
	for _, ch := range input {
		if (ch >= '0' && ch <= '9') {
			currentNumStr += string(ch) // Append to number builder
		} else if len(currentNumStr) > 0 {
			// End of a potential number sequence. Parse it.
			val, err := strconv.ParseInt(currentNumStr, 10, 64)
			if err == nil {
				count++
				if count == 1 || val > maxVal {
					maxVal = val
				}
			}
			currentNumStr = "" // Reset buffer for next number
		} else {
			continue // Skip non-digit characters (commas, spaces, letters) without starting a new number unless digit follows.
		}
	}

	return count, maxVal
}

// Wait, the above logic inside parseIntegers is good but I need to integrate it into main properly reading from stdin until EOF.
// Also handle case where input ends with digits (currentNumStr will not be reset).

func run() {
	var allInput string
	
	// Read entire input? Or process line by line and concatenate? 
	// Since Go streams are buffered, we can read into a buffer or just accumulate in memory if size is reasonable.
	// Spec doesn't limit input size but "64bit integer" suggests values fit int64, not necessarily file size.
	 // Let's use bufio.Scanner to get lines and join them? Or process line by line directly to save memory? 
	 // Processing line by line: we can parse numbers from each line independently (since commas/spaces are delimiters within a logical sequence).
	
	var count int64 = 0
	maxVal := -9223372036854775808
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		
		currentNumStr := ""
		
		for _, ch := range line {
			if (ch >= '0' && ch <= '9') {
				currentNumStr += string(ch)
			} else if len(currentNumStr) > 0 {
				val, err := strconv.ParseInt(currentNumStr, 10, 64)
				if err == nil {
					count++
					if count == 1 || val > maxVal {
						maxVal = val
					}
				} else {
					// Parse error? e.g. "123" is valid, but what if overflow during parse? 
				 // strconv.ParseInt handles range check and returns err for out of range values (which are not in 64bit int).
				 // Spec says "値は 64bit 整数の範囲に収まります", so we assume no overflow errors.
				}
				currentNumStr = ""
			} else {
				continue 
			}
		}
		
		// Handle trailing number at end of line (if loop ends with digits)
		if len(currentNumStr) > 0 {
			val, err := strconv.ParseInt(currentNumStr, 10, 64)
			if err == nil {
				count++
				if count == 1 || val > maxVal {
					maxVal = val
				}
			}
		}
		
		// Check for EOF error from scanner.Scan()
		if err := scanner.Err(); err != nil {
			break 
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Note: int64 vs %d? In Go fmt, use %%d or just print. But spec says "1 行". 
	// Wait, format string in printf uses integer formatting. For int64, we can still use %d (it works for signed integers up to long).
	// Or better: `fmt.Println` with concatenation? No, strict output format required.
}

func main() {
	run() // Call the logic function here if needed, but I put code in run above which needs imports. 
	// Let's consolidate into one block without helper functions to ensure single file structure as requested "1 つの
