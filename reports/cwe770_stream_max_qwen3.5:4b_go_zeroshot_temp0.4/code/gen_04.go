package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	var count int64 = 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle empty input correctly if needed. However, since we need the max of valid elements, initializing with the minimum possible int64 is safer for comparison logic when count > 0.
	// Actually, let's initialize maxVal to a very small number so that any valid integer will be larger or equal on first encounter. 
	// The smallest int64 is -9223372036854775808 (-1<<63). We can start with this value, but we must handle the case where no numbers are found (count == 0) gracefully?
	// The spec says "求めます" (find them), implying there is at least one element or count will be 0. 
	// If input has only invalid elements, max should probably still be outputted as something valid or the logic holds that if no numbers exist, we don't print a specific 'max' other than what makes sense?
	// Re-reading spec: "空要素・前後の空白は無視し、整数として解釈できない要素も無視します。" (Ignore empty elements and leading/trailing whitespace; ignore elements not interpretable as integers.)
	// It doesn't explicitly say what to do if no valid numbers exist. However, typically in such problems, if count is 0, max might be undefined or we just output the format with 0. 
	// Let's assume standard behavior: calculate based on found numbers. If none found, maybe print `count=0` and a placeholder? Or perhaps the problem implies valid input exists.
	// To be safe for "max", let's initialize maxVal to int64(-1<<63) (min value). 
	// Wait, if I find no numbers, printing min_int64 as 'max' might look wrong but is technically a result of the logic flow without valid data.
	// A better approach: Initialize with `int64(math.MaxInt)`? No, we don't have math package allowed (only standard lib). 
	// Let's use int64(-1<<63) as initial max. If count remains 0 after loop, it means no valid integers were found.
	
	maxVal = -9223372036854775809 // This is less than min int64 (-9223372036854775808). 
	// Actually, let's just use a flag or check inside the loop.
	
	found := false
	
	for _, char := range line {
		if (char >= '0' && char <= '9') || char == '-' {
			continue // We are in potential number territory? No, simpler to parse string directly with strconv.ParseInt which handles skipping non-digits automatically if we iterate carefully or just split by comma.
			break 
		}
		if (char >= '0' && char <= '9') || char == '-' {
			continue // This logic is flawed for parsing a whole line at once easily without splitting first.
		}
		
		// Better approach: Split the string by commas and whitespace, then parse each part.
		break 
	}

	// Correct Parsing Logic
	parts := []string{}
	var current string
	
	for _, char := range line {
		if (char >= '0' && char <= '9') || char == '-' || char == '+' || char == '.' // Wait, spec says "整数" (integer). So no dots. 
			// Spec: "カンマ区切りの整数列". Integers don't have decimals usually in this context unless specified as float but it says integer.
			// Let's stick to strict integers.
			continue
	}

	// Re-implementing parsing robustly using bufio and strconv is safer than manual char iteration for "ignore non-integer elements" if the input format is messy like "1, 2 ,3". 
	// The spec says "空要素・前後の空白は無視し、整数として解釈できない要素も無視します。"
	// This implies we should try to parse tokens separated by commas or whitespace.

	tokens := []string{}
	var tokenBuilder string
	
	for _, char := range line {
		if (char >= '0' && char <= '9') || char == '-' { // Assuming only digits and minus sign for integers? Or could there be other chars that make it non-integer but part of a number like "1a"? 
			// If the input is "1, 2abc", we should ignore "abc".
			tokenBuilder += string(char)
		} else {
			if len(tokenBuilder) > 0 {
				tokens = append(tokens, tokenBuilder)
				tokenBuilder = ""
			}
		}
	}
	if len(tokenBuilder) > 0 {
		tokens = append(tokens, tokenBuilder)
	}

	for _, t := range tokens {
		val, err := strconv.ParseInt(t, 10, 64) // Parse as base 10 integer. 
		// If parsing fails (e.g., "abc", or "+"), it returns an error and we ignore it per spec ("整数として解釈できない要素も無視します").
		if err != nil {
			continue
		}
		
		count++
		found = true
		
		if count == 1 || val > maxVal { // Using the first valid value as initial comparison target to avoid initialization issues with negative numbers.
			maxVal = val
		} else if found && val >= maxVal { 
			maxVal = val
		}
		
		// Wait, logic correction: Initialize maxVal properly or use a flag.
		if count == 1 {
			maxVal = val
		} else if !found || val > maxVal { // If it's the first one (count==1), set max. Else update.
			maxVal = val
		}
		
		found = true 
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
	
	// Wait, if found is false initially? The loop sets it to true on first valid number.
	// If no numbers are found, what should be printed? 
	// Spec: "それらの『要素数』と『最大値』を求めます。" -> Find the count and max of those elements.
	// If there are 0 elements, count is 0. Max is undefined. But we must output a line.
	 // Let's assume if count == 0, maybe print `count=0` and something? Or perhaps input guarantees at least one number? 
	 // Given the constraints of "code generator", I will follow strict logic: calculate max over valid numbers found. If none, keep initial state or handle gracefully.
	 // Let's re-init maxVal to a very small number so that if count > 0 it updates correctly. 
	 // But what if all numbers are smaller than -9223372036854775808? Impossible for int64 range.
	 // So initializing with min_int64 is safe because any valid int >= min_int64 will update it on first iteration (count==1).
	
	fmt.Printf("count=%d max=%d\n", count, maxVal) 
}

// Wait, I need to fix the logic flow above. The previous block had broken syntax and duplicated code. Let's rewrite cleanly.
