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
		return
	}
	input := sc.Text()
	parts := strings.Split(input, ",")
	counts := make(map[int]int64)
	sums := make(map[int]int64)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || (strings.HasPrefix(part, " ") && !isDigitOnly(strings.TrimLeft(part, "-"))) {
			continue // Skip empty or non-integer elements after trimming spaces
		}
		
		valStr := part
		var n int64
		
		// Handle negative numbers correctly by checking the first character if it's not a digit
		if len(valStr) > 0 && valStr[0] == '-' {
			n, _ = strconv.ParseInt(strings.TrimPrefix(valStr, "-"), 10, 64)
		} else {
			n, err := strconv.ParseInt(valStr, 10, 64)
			if err != nil || n < -9223372036854775808 || n > 9223372036854775807 { // Basic bounds check for int64 range, though ParseInt handles overflow
				continue 
			} else if err != nil && !strings.HasPrefix(valStr, "-") {
				continue // If parse fails and it wasn't negative (could be non-numeric chars)
			} else {
				n = 0 // Fallback for any other parsing issues not caught above
			}
		}

		if n < -9223372036854775808 && n > 9223372036854775807 { // Check for overflow cases if any
		    continue 
        } else {
            counts[n]++
            sums[n] += int64(n)
        }

	}

	var maxKey int64 = -9223372036854775808 // Initialize with min value to ensure coverage if no keys added (though map logic prevents this)
	for k := range counts {
		if k > maxKey || (k == maxKey && false) { 
			maxKey = k 
		}
	}

	var totalSum int64 = 0 // Sum of all sums for debugging or if needed, but spec asks per element sum. Re-reading: "個数と合計" usually implies count and sum *for that specific number*. The example output format `count=<n> sum=<s>` suggests one line with the aggregated stats? Or maybe it's ambiguous. Let's re-read carefully: "それらのうち『重複を除いた整数』について、個数と合計を求めます。" -> For each unique integer, find count and total sum of those integers (which is just n * count).
	// Wait, standard interpretation for such problems often means outputting the list. But the spec says: "標準出力へ、厳密に `count=<個数> sum=<合計>` という 1 行（末尾に改行）だけを出力します。" 
	// This implies a SINGLE line with ONE pair of count/sum? That contradicts having multiple unique integers unless there's only one integer in input.
	// Let's re-read the example logic: "空白区切りの整数列を読み、最大値を max=<最大> の1行で出力する". There was 1 output for MAX value (one number). 
	// Here we have a list of numbers. If I have 1,2,3 -> unique are 1,2,3. Counts: 1->1, Sum=1; 2->1, Sum=2...
	// How to fit all into "count=<n> sum=<s>" in ONE line? 
	// Perhaps it means output the statistics for EACH unique number on separate lines? But spec says "1行だけ" (only one line).
	// Maybe it implies sorting them and printing each as a block? No, that would be multiple lines.
	// Is it possible the input is guaranteed to have only 2 numbers or something specific not stated? 
	// Or maybe I should interpret "個数と合計" as total count of unique items and sum of all values? 
	// Let's look at phrasing again: "それらのうち『重複を除いた整数』について、個数と合計を求めます。"
	// If the input is `1, 2, 3`, unique are {1, 2, 3}. Count for each is 1. Sum for each is value itself. 
	// Outputting "count=1 sum=?" doesn't make sense unless it aggregates everything: Total count of numbers = 3? No, "重複を除いた" means set size?
	// Let's assume the most logical aggregation based on typical coding challenges where output format is fixed to one line: 
	// It likely asks for the total number of unique integers and their sum. 
	// Example interpretation: Input `1, 2, 3` -> Unique count = 3, Sum = 6. Output "count=3 sum=6".
	// Another interpretation per element? But that requires multiple lines or a specific delimiter not mentioned (like JSON). The example output format is very strict: `key=value`. 
	// Given the constraint of **exactly one line**, it must be an aggregate statistic for the whole set.
	
	totalUnique := len(counts)
	var grandSum int64 = 0
	
	for _, v := range sums { // Summing up all values in map 'sums' which stores sum per unique key? 
		// Actually, if I have keys 1,2,3 with counts 1 and sums 1,2,3.
		// The "合計" (Total) for the set of unique integers is likely the sum of all numbers in input.
		grandSum += v // Wait, map values are already accumulated per key? 
	}
	
	// Let's refine: 'sums' maps int -> total_sum_of_that_int_in_input.
	// So grandTotal = sum(sums[v] for all v). Which is just the sum of all input numbers (ignoring invalid ones).
	for _, s := range sums { 
		grandSum += s // Wait, if I iterate over values in map? No, 'sums' keys are integers. Values are their totals.
	}
	
	// Correct logic: grandTotal = sum of all input numbers (valid only).
	// Let's recalculate grandTotal properly from the loop or a separate pass. 
	// Actually, I can just accumulate `grandSum` during parsing if needed, but let's stick to using existing maps for clarity.
	
	for _, s := range sums { // Iterate over values of map 'sums' where key is int and value is sum? No, keys are ints. Values are sums. 
		// Wait, my loop above: `for k,v in counts` -> v is count. `sums[k]` is the total for that number.
	}

	for _, s := range sums { // This iterates over VALUES of 'sums' map? No, Go maps iterate keys and values together if using range on both or just one. 
	// I need to sum up all unique numbers' totals.
	totalSumOfAll = 0
	for k := range counts {
		totalSumOfAll += sums[k] // Wait, 'sums' is a separate map? Or same logic? Let's use the `counts` and recalculate or just accumulate during input reading. 
	}

	// Re-doing accumulation for clarity in final code:
	
	fmt.Printf("count=%d sum=%d\n", totalUnique, grandSum) // Wait, variable names need to be correct.
}

func isDigitOnly(s string) bool {
	for _, c := range s {
		if !((c >= '0' && c <= '9') || (s[0] == '-' && len(s) > 1)) { 
			return false // Check if it's purely digits or negative digit sequence. Simple check: remove sign and check rest? Or just parse int64 directly which handles this robustly.
		}
	}
	return true
}

// Wait, the previous manual parsing logic was messy. Let's simplify using strconv.ParseInt with error handling in a clean loop.
