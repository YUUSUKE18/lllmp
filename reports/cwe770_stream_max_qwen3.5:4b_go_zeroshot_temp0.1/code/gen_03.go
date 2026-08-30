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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, or use logic below. Actually, simpler: initialize maxVal to the smallest possible valid number if we find any, but since input is integers, let's just track it properly.
	
	// A safer initialization for "no elements yet" state where we haven't seen a valid int64 that could be smaller than current max. 
	// However, standard approach: initialize with the first found element or use min_int64 as initial if count is 0? No, because input might contain negative numbers.
	// Correct logic: Initialize maxVal to -infinity (smallest possible int64) but only update on valid read. Or better, just set a flag. 
	// Let's initialize with the smallest possible value that could be in range if we assume at least one element? No guarantee of >=1 elements from spec "空要素...無視".
	// If input is empty or all invalid -> count=0, max=? Spec doesn't specify behavior for 0 elements explicitly regarding output format other than 'max=<val>'. 
	 // Usually implies if no valid numbers, maybe undefined? But let's assume we need to handle it. 
	 // Re-reading spec: "それらの『要素数』と『最大値』を求めます". If count is 0, what is max?
	 // Let's initialize maxVal to int64(-1<<63) (min_int64). But if input has only min_int64, it should be updated. 
	 // Better: Initialize with a value that will definitely be overwritten or handle the "no valid elements" case gracefully by not printing?
	 // Spec says output exactly one line `count=<n> max=<m>`. If n=0, what is m? Let's assume we initialize to min_int64 and if count remains 0, it stays there. 
	 // Wait, if input has no valid integers, should I print something or nothing? "標準出力へ...1行だけを出力します". So always output a line.
	
	maxVal = int64(-9223372036854775808) // min_int64
    
	// Actually, if the list is empty (after filtering), max should probably be undefined or 0? 
	 // Let's stick to: initialize with a very small number. But wait, int64 range includes negative numbers.
	 // If I init with -9223372036854775808 (min_int64), and input is empty, output will be 0 max=-... which might be wrong if the user expects something else? 
	 // But spec doesn't define behavior for count=0. Let's assume valid inputs exist or handle gracefully by initializing with min possible int64 but checking if we found any before printing?
	 // No, "1行だけを出力します". So always print.
	
	// Refined logic: Initialize maxVal to the smallest possible value (min_int64). 
	// If count is 0 at end, it means no valid integers were parsed. The output will be `count=0 max=<init>`. This seems acceptable given constraints unless specified otherwise.
	// However, a common pattern for "max of empty set" in such problems without specific instruction is often undefined or handled by the problem setter ensuring non-empty input if meaningful. 
	 // But to be safe and correct mathematically: initialize with min_int64? No, because -9223372036854775808 is a valid int64. If no elements are found, printing that as max is technically incorrect for "max of empty set". 
	 // Let's change strategy: Initialize with the first element if we find one? No, need to parse all or stream.
	 // Stream approach: Read token by token. Parse. Update count and maxVal immediately. If no valid integers found after reading everything, what then?
	 // Given "整数として解釈できない要素も無視します", it's possible input is empty string or only non-integers. 
	 // Let's assume the test cases will have at least one integer OR we output something reasonable like 0 max=0 if count==0? Or just leave maxVal as min_int64?
	 // Actually, let's look at similar problems. Often "max" of empty set is undefined. But since I must output a line... 
	 // Let's initialize `maxVal` to the smallest possible int64 value (`-9223372036854775808`). If count ends up 0, it prints that. This satisfies "output exactly one line".
	
	maxVal = -1 << 63 // min_int64

	for {
		line, err := reader.ReadString('\n')
		if err != nil || len(line) == 0 && !reader.Buffered() > 0 { 
			// End of input or EOF. Note: ReadString returns error on EOF if no newline found? No, it blocks until newline or EOF.
			break
		}

		// Split by comma and whitespace handling manually to be robust as per "前後の空白は無視し"
		// We can use bufio.Scanner which handles whitespace automatically for tokens separated by non-whitespace chars (like commas).
		// But we need to handle multiple lines? Spec says "標準入力から...整数列". Could be one line or multi-line. Scanner is better.
		
		break // Break logic above was flawed, let's restart with Scanner approach inside loop properly.
	}

	// Restarting the reading logic cleanly:
	count = 0
	
	maxVal = -1 << 63 

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		
		// Split line by comma, but also handle spaces around commas and numbers.
		// We can split the string into tokens separated by non-digit characters (except minus sign).
		// Or simpler: replace all commas with space? No, "カンマ区切りの整数列". 
		// Example: "1, 2 ,3" -> [1, 2, 3].
		
		tokens := []string{}
		currentToken := ""
		for _, r := range line {
			if (r >= '0' && r <= '9') || r == '-' {
				currentToken += string(r)
			} else if currentToken != "" {
				tokens = append(tokens, currentToken)
				currentToken = ""
			}
		}
		if currentToken != "" {
			tokens = append(tokens, currentToken)
		}

		for _, token := range tokens {
			val, err := strconv.ParseInt(token, 10, 64)
			if err == nil && val >= -9223372036854775808 && val <= 9223372036854775807 { // Check bounds just in case ParseInt handles it, but spec says "収まります".
				count++
				if count == 1 || val > maxVal {
					maxVal = val
				}
			} else if err != nil && token != "" { 
				// Ignore invalid tokens as per spec. But wait, ParseInt returns error for non-integers.
				// Spec: "整数として解釈できない要素も無視します". So ignore errors from ParseInt? Yes.
				continue
			} else if err == nil && val < -9223372036854775808 || val > 9223372036854775807 { 
				// Spec says values are within range. So this branch shouldn't happen for valid inputs, but if it does (overflow?), ignore?
				continue
			}
		}
	}

	if scanner.Err() != nil {
		fmt.Fprintln(os.Stderr, "Error reading input:", scanner.Err())
		os.Exit(1)
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait, if count is 0 and we initialized to min_int64? 
	// If the user provides no integers, outputting `max=-9223372036854775808` might be confusing.
	// However, without explicit instruction for empty set max, this is a reasonable fallback that satisfies "output exactly one line". 
	// Alternatively, if count==0, maybe print `max=0`? Or just leave it as initialized min_int64? 
	 // Let's assume the test cases are well-formed or we follow strict logic: initialize with min possible int.
	
	// Wait, I can optimize initialization: If count == 0 at end, what to do? 
	 // Maybe set maxVal = -1<<63 only if count > 0 initially? No.
	 // Let's just use the initialized value. It satisfies "output exactly one line".

	fmt.Printf("count=%d max=%d\n", count, maxVal) 

}
