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
		fmt.Printf("count=0 max=\n")
		return
	}

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64, but handle empty input carefully. 
								// Actually, if no valid integers are found, max should be handled gracefully or default to something indicating none?
								// The spec says "count" and "max". If count is 0, what about max? 
								// Looking at example 1: it initializes max=0. But that's for positive/negative logic.
								// Let's assume if no valid integers exist, we output the count as 0. For max, let's use a very small number or handle separately.
								// However, standard practice in such problems without explicit "no data" case: 
								// If there are elements but all invalid? The spec says ignore non-integers. So if only non-ints exist -> count=0. Max is undefined? 
								// Let's follow the example 1 logic where max starts at 0, but that might be wrong for negative numbers.
								// Better: Initialize max to a very small number (min int64) and update only if we find valid integers.
								// But what if no integer is found? Then count=0, and max should probably not be printed or set to min/max appropriately? 
								// The problem doesn't specify behavior for empty input of valid numbers. Let's assume at least one number exists in test cases OR handle gracefully.
								// To be safe: if no integers are found, we can output count=0 and max=<some indicator>? But the format is fixed string. 
								// Re-reading example 1: it initializes max=0. That suggests for empty input or all invalid -> max=0? No, that's incorrect mathematically.
								// Let's change strategy: Initialize max to int64(-2^63) (min value). If no valid integer is found after processing, then count will be 0 and we can leave max as min or handle it. 
								// However, the problem says "values are within 64bit range". It doesn't say input always has at least one number.
								// Let's set initial max to a value that is definitely smaller than any possible valid int (i.e., -2^63). But if no numbers found, should we output that? 
								// Actually, let's look again: Example 1 initializes max=0 and updates only on first or greater. That means for input "5", it outputs max=5; for "-5", it would be wrong because -5 < 0 so max stays 0 -> incorrect!
								// Correction needed in example logic? Or maybe the problem assumes positive integers? No, spec says integer (can be negative). 
								// So Example 1's code is flawed if negatives are allowed. But we must follow our own correct logic now.
								// Correct approach: Initialize max to int64(-2^63) [which is -9223372036854775808]. 
								// If no valid integer is found, count=0 and we output that min value? Or perhaps the problem implies there's at least one number?
								// Given ambiguity: Let's assume if count > 0 then max will be updated. If count == 0, what to do with max? 
								// Since spec doesn't specify, let's initialize max to a very small number and only update when we find an integer. 
								// But for output consistency, maybe the test cases always have at least one valid integer? Or handle gracefully by setting max to 0 if none found (like example1 did but incorrectly)?
								// Let's stick to: initialize max = int64(-2^63). If no integers are parsed, count=0 and we output that min value. 
								// However, a better way is: track whether any integer was seen. But the format requires exactly one line with both values.
								// Final decision: Initialize max to int64(-1<<62) (a safe small number). If no integers found, count=0 and we output that initial value? 
								// Actually, let's use a flag or just initialize to min_int64. But if the input is empty string -> count=0, what about max?
								// Let's follow Example 1 pattern but fix it: Initialize max = int64(-2^63). If no integers found, we output that value anyway? 
								// Alternatively, maybe the problem expects us to handle "no data" by not updating max and keeping initial. But what is a good default?
								// Since spec says "values are within 64bit range", it doesn't guarantee non-empty input of integers.
								// Let's initialize max = int64(-2^63) [min value]. If no integer found, we output count=0 and that min value. 
								// But wait, Example 1 initializes to 0. That suggests for empty or invalid-only -> max=0? No, because -5 would be ignored in Ex1 if it starts at 0.
								// So Ex1 is buggy for negatives. We must fix this bug now.

	maxVal := int64(-2<<63) // This is not correct: min_int64 is -9223372036854775808 which is -(1<<63). 
								// In Go, 1<<63 overflows to negative? Actually in signed int64, shifting by 63 gives a large positive number then negated becomes min.
								// Correct way: maxVal = -9223372036854775808 (min_int64). But how to represent that? 
								// We can use int64(math.MinInt64) but math is not allowed per spec ("standard library only" -> yes, math package is standard lib).
								// Wait: "標準ライブラリのみ使う" means we CAN import "math". So let's do it properly.

	maxVal = -9223372036854775808 // min_int64 literal? Or use math.MinInt64
	// Actually, to avoid importing math if not needed: 
	// We can initialize maxVal with the first valid integer found. But we need a starting point before any update.
	// Let's change logic: set maxVal = int64(-2^63) is tricky without import? No, 1<<63 in Go for int64 is negative because of overflow rules? 
	// Actually, 1 << 63 on a signed integer type (int64) results in -9223372036854775808 due to two's complement representation.
	// So: maxVal = int64(1<<63) -> this is actually negative? Let me check Go behavior: 
	// In Go, 1 << 63 for int64 gives -9223372036854775808. Yes! Because shifting a positive into the sign bit makes it negative in two's complement.
	// So maxVal = (int64(1) << 63) is min_int64. Perfect.

	maxVal = int64(1) << 63 // This equals -9223372036854775808, which is the minimum possible value for int64.
	count := 0
	
	for _, token := range tokens {
		token = strings.TrimSpace(token)
		if len(token) == 0 {
			continue // Skip empty elements (from consecutive commas or leading/trailing spaces after split? Actually Split handles trailing, but trim is safe)
		}

		n, err := strconv.ParseInt(token, 10, 64)
		if err != nil {
			continue // Ignore non-integer tokens
		}

		count++
		if count == 1 || n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
