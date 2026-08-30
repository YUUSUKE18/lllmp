package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we handle input reading properly below if needed. 
	// Actually, for standard input in Go without arguments, we need to read from os.Stdin or similar.
	// Let's use a proper way to read all tokens until EOF.

	var integers []int64
	
	// Read all lines and parse integers
	for {
		line, err := bufio.NewReader(nil).ReadBytes('\n') // This won't work as intended without stdin source
	}
	
	// Correct implementation using os.Stdin is not allowed per "standard library only" but usually implies standard I/O. 
	// However, the prompt says "Standard input". In Go competitive programming context, we use bufio.NewReader(os.Stdin).
	// Since 'os' package is part of standard library and required for Stdin access in most environments:
	
	import (
		"os"
	)

	reader = bufio.NewReader(os.Stdin) // Re-declare after import
	
	integers = []int64{}
	var sumBig *big.Int
	sumBig.SetInt64(0)
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break 
		}
		
		// Remove leading/trailing whitespace and split by comma or space? 
		// Spec says "comma-separated", but also mentions ignoring extra spaces. 
		// Let's assume input is like: 1,2,3 or 1 , 2 , 3
		line = line // Trimmed later
		
		parts := []string{}
		
		// Split by comma first, then handle individual parts for whitespace and invalid chars
		for _, part := range splitByComma(line) {
			part = trim(part)
			
			if len(part) == 0 || !isDigitOnly(part) {
				continue 
			}
			
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue 
			}
			
			integers = append(integers, val)
		}
		
		// Wait, the above logic is flawed because we need to process ALL integers in one go.
		// Let's rewrite cleanly inside main loop properly reading all lines first or processing line by line accumulating a set/map? 
		// Actually, spec says "count unique" and "sum". We can use a map[int64]bool for existence check if needed, but since we need sum of UNIQUE integers only.
		
	}

	// Let's restart the logic cleanly with correct imports
	
	import (
		"os"
	)
	
	reader = bufio.NewReader(os.Stdin) // Re-declare after import
		
	integers := []int64{}
	var seen map[int64]bool
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break 
		}
		
		parts := splitByComma(line)
		
		for _, part := range parts {
			part = trim(part)
			
			if len(part) == 0 || !isDigitOnly(part) {
				continue 
			}
			
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue 
			}
			
			integers = append(integers, val) // We collect all first to avoid map overhead? No, we can just check seen.
		}
		
		// Actually better: process per line or accumulate in a set directly.
		// Let's do it right now inside the loop properly without storing all integers if not needed.
	}

	// Final clean implementation
	
	import (
		"os"
	)
	
	reader = bufio.NewReader(os.Stdin) // Re-declare after import
		
	var uniqueInts map[int64]bool = make(map[int64]bool)
	sumBig := big.NewInt(0)
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break 
		}
		
		parts := splitByComma(line)
		
		for _, part := range parts {
			part = trim(part)
			
			if len(part) == 0 || !isDigitOnly(part) {
				continue 
			}
			
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue 
			}
			
			if uniqueInts[val] {
				sumBig.Add(sumBig, big.NewInt(val)) // Add if already seen? NO. Spec: "unique integers". Sum of UNIQUE values.
				// So we only sum each value ONCE regardless of how many times it appears in input.
				continue 
			} else {
				uniqueInts[val] = true
				sumBig.Add(sumBig, big.NewInt(val)) // Add once per unique integer found
			}
			
			// Wait, if I see 1 twice: first time add to sum and mark seen. Second time skip because already in map? 
			// Yes. "重複を除いた整数" -> Unique integers. Sum of those unique values.
		}
		
	}

	fmt.Printf("count=%d sum=%s\n", len(uniqueInts), sumBig.String()) // Wait, count is number of UNIQUE elements found so far in the stream? 
	// Or total count after processing all input? Yes. "それらのうち『重複を除いた整数』について".
	
}

func splitByComma(s string) []string {
	result := make([]string, 0)
	start := 0
	
	for i := 0; i < len(s); i++ {
		if s[i] == ',' || (i+1 >= len(s)) { // Handle end of line as delimiter too? No, just comma. But trailing newline removed by ReadString('\n').
			result = append(result, s[start:i])
			start = i + 1
		}
	}
	
	if start <= len(s) && (s[len(s)-1] == ',' || true) { // If last char is comma or end of string? 
		// Actually simpler: replace commas with spaces and split by whitespace.
		s2 := s + "," // Ensure trailing delimiter if needed, but let's just use strings.Split
		return strings.FieldsFunc(s, func(r rune) bool { return r == ',' })
}

func trim(s string) string {
	start := 0
	end := len(s) - 1
	
	for start < end && (s[start] == ' ') || s[start] == '\t' { // Actually spec says "blank" -> space/tab/newline? 
		start++
	}
	
	if start > end { return "" }
	
	for end >= start && (s[end] == ' ') || s[end] == '\t' {
		end--
	}
	
	return s[start : end+1]
}

func isDigitOnly(s string) bool {
	for _, r := range s {
		if !((r >= '0' && r <= '9')) { return false }
	}
	return true
}
