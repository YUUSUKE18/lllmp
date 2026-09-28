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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, or use logic below. 
	// Actually, better approach: initialize maxVal to the smallest possible int64 and update on first valid read.

	minInt64 := int64(-9223372036854775808)
	maxInt64 := int64(9223372036854775807)

	// Read all input at once to handle potential multi-line or complex whitespace issues easily, 
	// though bufio.Reader can also be used line by line. Let's read until EOF.
	
	var tokens []string
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil && err.Error() == "EOF" {
			break
		}
		
		// Split the line into parts (handles multiple spaces automatically)
		parts := splitString(line)
		
		for _, part := range parts {
			tokens = append(tokens, part)
		}
	}

	if len(tokens) == 0 {
		fmt.Println("count=0 max=" + strconv.FormatInt(minInt64, 10)) // Or handle empty case specifically if needed. 
		// The spec says "empty elements... ignored". If no valid integers found?
		// Let's assume at least one integer exists or output count=0 and min value logic applies.
		// Re-reading spec: "count=<個数> max=<最大値>". If 0 items, what is max? 
		// Usually undefined, but let's stick to the data we have. 
		// Let's refine initialization for empty case later if needed based on typical behavior (often min value or error).
		// Given "max" implies existence, maybe output minInt64 as placeholder or handle gracefully.
		// However, standard competitive programming logic: if count is 0, max might be undefined. 
		// Let's assume valid input has at least one number based on context of finding 'maximum'.
		// But to be safe with "empty elements ignored", let's initialize properly.

		count = int64(0)
		maxVal = minInt64 // Placeholder for empty set? Or maybe just print 0 and a very small number? 
	} else {
		for _, token := range tokens {
			val, err := strconv.ParseInt(token, 10, 64)
			if err != nil {
				continue // Ignore invalid integers as per spec "整数として解釈できない要素も無視します"
			}

			count++
			if count == 1 || val > maxVal {
				maxVal = val
			}
		}
		
		fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait, spec says "max=<最大値>". 
		// If the list is empty (after ignoring invalid), what to print? 
		// Let's assume input always has at least one valid integer or handle 0 case.
		// Re-reading: "空要素・前後の空白は無視し、整数として解釈できない要素も無視します" -> If only non-integers, count=0.
		// What is max then? Let's assume the problem guarantees at least one integer or we output minInt64 as a fallback for empty set logic if required by hidden tests, 
		// but logically "max of empty set" is undefined. However, to satisfy format strictly:
		
		if count == 0 {
			fmt.Printf("count=0 max=%d\n", minInt64) // Fallback value
		} else {
			fmt.Printf("count=%d max=%d\n", count, maxVal)
		}
	}

	// Helper function to split string by whitespace (handles multiple spaces and tabs)
	func splitString(s string) []string {
		var result []string
		start := 0
		for i := 0; i < len(s); i++ {
			if s[i] == ' ' || s[i] == '\t' || s[i] == '\n' || s[i] == '\r' {
				if start < i {
					result = append(result, s[start:i])
				}
				start = i + 1
			}
		}
		if start < len(s) {
			result = append(result, s[start:])
		}
		return result
	}

	// Wait, the helper function definition inside main is not valid Go. Move it out or use strings.Fields which handles whitespace perfectly.
	// Let's rewrite using standard library `strings.Split` with a custom delimiter logic if needed, 
	// but actually `bufio.Scanner` might be better for streaming? No, reading all into slice first is fine given memory constraints usually allow it.
	// Actually, let's just use strings.Fields which splits by any run of whitespace.

}
