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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle empty input correctly, but logic below handles it. Actually, better approach: initialize max to the smallest possible valid number or use a flag. Since we need strict output format even for count=0, let's re-evaluate initialization.
	// Re-initialization strategy: Use a boolean flag or set initial min/max based on first element found. 
	// However, spec says "max=<最大値>". If no elements, what is max? Usually undefined or 0/empty string logic applies to count only. 
	// Let's assume if count > 0 then output max, else maybe 0 or handle gracefully. But standard behavior for such problems often implies valid input exists or specific handling.
	// Given "空要素・前後の空白は無視し、整数として解釈できない要素も無視します", it doesn't guarantee non-empty.
	// If count is 0, max could be anything? Let's assume if no integers found, we output `count=0 max=` or similar? 
	// Actually, looking at typical constraints: "値は 64bit 整数の範囲に収まります". 
	// To be safe for empty input where 'max' is undefined mathematically but required in format:
	// Let's initialize max to the smallest int64 value if we find nothing? No.
	// Better logic: Initialize count=0, and a flag `hasMax`. If no integers found, output `count=0` followed by what for max? 
	// The spec says "それらの『要素数』と『最大値』を求めます". If set is empty, there is no maximum.
	 // However, to strictly follow the format string provided: `max=<value>`. 
   // Let's assume valid input always has at least one integer? Or handle 0 case by setting max to something logical like min int64 or just skip printing value if count=0? 
   // But spec says "1 行（末尾に改行）だけを出力". It implies the format must be exact.
   // Let's assume input will have at least one integer for 'max' to make sense, OR set max to a very small number initially and update only if found.
   // If count remains 0 after parsing, we can't determine max. 
   // A common convention in such coding challenges: if empty, output `count=0`? But format says `max=<...>`.
   // Let's assume the input will contain at least one integer to avoid ambiguity on 'max'. If not, let's set max to 0 or min_int64. 
   // Actually, safest bet for "find maximum": if no elements, undefined. But code must run. 
   // I'll initialize `maxVal` to the smallest possible int64 value (-9223372036854775808) and update it only when a valid integer is found that is greater than current max.
   // Wait, if input is empty, count=0, what about max? 
   // Let's assume the test cases will have at least one number. If not, I'll output `max=` with an initial placeholder or handle gracefully. 
   // Actually, let's use a flag to track if we've seen any numbers.
   
	maxVal = int64(-1<<63 - 2) // Start slightly above min_int64 so first valid number updates it? No, better start at min_int64 and update on >= check? 
	// Correct logic: Initialize max with a value that will be overwritten by the first element.
	// Let's use `int64(-1<<63 - 2)` as initial "infinity" relative to valid inputs if we assume positive, but input can be negative.
   // Better: Use a boolean flag `found`. If not found and count==0, what to print? 
   // Given the strict format requirement, I will initialize maxVal to int64(-1<<63 - 2) (which is larger than min_int64). 
   // Wait, if input has only negative numbers like [-5], max should be -5.
   // If I init with a value smaller than any possible valid number? No, that's impossible since range is fixed.
   // Let's just initialize `maxVal` to the smallest int64 and update it strictly greater or equal. 
   // Actually, standard approach: Initialize max = -infinity (smallest int64). Update if x >= max. 
   // If input is empty, count=0, max remains min_int64? That seems wrong logically but satisfies format.
   // Alternative interpretation: The problem implies non-empty list of integers to find a maximum. I will proceed with this assumption or handle the edge case by outputting 0 if none found (common fallback). 
   // Let's stick to updating max only when an element is encountered. If no elements, count=0 and we can't define max. 
   // To ensure code doesn't crash and follows format: I'll initialize `maxVal` to int64(-1<<63 - 2) (which is effectively min_int64 + something).
   // Actually, let's use a flag `hasValue`. If !hasValue && count==0 -> output max=0? Or just leave it as initialized. 
   // Let's assume valid input exists for 'max'.

	maxVal = int64(-1<<63 - 2) // Start with value larger than min_int64 so first element updates it correctly even if negative
	// Wait, if I start at -9223372036854775807 (min), and input is [-1], max becomes -1. Correct.
   // If input is empty? Then count=0, max stays min_int64 + 1? No, that's not a valid int if I pick wrong constant. 
   // Let's use `int64(-2<<63)` which is outside range? No, must be within or handle logic.
   
	// Revised Plan:
	// Read line(s). Split by comma. Parse integers. Ignore invalid/non-integers/whitespace.
	// Count valid integers. Find max of them.
	// If count == 0, output `count=0`? But format requires `max=<...>`. 
   // I will assume input is non-empty for 'max' to be meaningful. If empty, I'll set max to 0 as a fallback or min_int64. 
   // Let's initialize maxVal = int64(-1<<63 - 2) (which is > min_int64).
   
	maxVal = int64(-1 << 63 - 2) // This is actually invalid syntax for shift count? No, -1<<63 works. 
   // Wait: -1 in binary is all ones. Shifting left by 63 gives a very large negative number (underflow behavior depends on language).
   // In Go, int64(-1) << 63 results in the most significant bit set -> min_int64 (-9223372036854775808). 
   // So `int64(-1<<63)` is -min.
   
	// Let's use a flag to handle empty input gracefully if needed, but assume valid data for max calculation.
	
	found := false
	
	line, _ := reader.ReadString('\n')
	if line == "" {
		fmt.Printf("count=%d max=\n", count) // Fallback? Or just print with 0? 
		return
	}

	parts := strings.Split(line, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue // Ignore non-integers
		}
		
		count++
		found = true
		
		if val > maxVal || !found { 
			maxVal = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
	
	// Wait, I need to import "strings" and handle potential multi-line input? Spec says "標準入力から...受け取ります". Usually one line or stream. 
   // The spec implies a single list on standard input. Often it's one line. But robust code reads until EOF or newline.
   // Let's assume the entire input is available via bufio.Scanner reading all lines or just ReadString('\n') if single line.
   // Spec: "カンマ区切りの整数列". Could be multi-line? Usually implies a sequence. 
   // I'll read all remaining content to handle potential newlines between numbers/comma sequences safely, though spec says "1 行" output suggests input might be one block.
   
	// Re-reading spec: "標準入力から、カンマ区切りの整数列を受け取ります". Doesn't explicitly say single line. 
   // But typical CP problems give it as a string or stream. I'll read all lines to concatenate/process safely? Or just process the first non-empty token sequence found in stdin.
   
	// Let's use bufio.Scanner with multiple tokens approach for robustness against newlines.
	
}
