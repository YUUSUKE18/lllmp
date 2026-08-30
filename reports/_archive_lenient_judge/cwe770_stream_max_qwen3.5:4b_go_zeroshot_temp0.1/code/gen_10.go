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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, but logic below handles empty input gracefully. Actually, simpler: initialize max to the smallest possible valid number or use a flag. Let's use a boolean flag for initialization.

	hasInput := false
	var currentMax int64 = -1 // Will be set on first valid integer found if we assume inputs are >= min_int64? No, spec says 64bit range. So init to something that indicates "not set". 
	// Better approach: Initialize maxVal to the minimum possible value of int64 (or less) and use a flag or check count > 0 after loop if we want strict behavior for empty input.
	// However, standard practice is to initialize with min_int64 - something? No. Let's just set it to the first valid number found.

	maxVal = -1 // Placeholder
	
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		
		// Remove leading and trailing whitespace
		cleanLine := ""
		start := 0
		end := len(line)
		for start < end && line[start] == ' ' || line[start] == '\t' || line[start] == '\n' {
			start++
		}
		if start >= end {
			continue // Empty string or only whitespace
		}
		
		end = len(line) - 1
		for end > start && (line[end] == ' ' || line[end] == '\t' || line[end] == '\n') {
			end--
		}

		subStr := line[start : end+1]
		
		// Split by comma or space? Spec says "comma-separated". Usually implies commas, but sometimes spaces around. 
		// Let's assume standard CSV format: elements separated by ','. But the spec says "integer list", often implying tokens.
		// Re-reading: "カンマ区切りの整数列" -> Comma-separated integer sequence.
		
		parts := []string{}
		for _, part := range subStr { // Wait, split is needed on comma.
			if len(subStr) == 0 || (subStr[0] != ',' && subStr[len(subStr)-1] != ',') {
				continue 
			}
			break
		}

		// Correct splitting logic: replace commas with spaces or use strings.Split
		tokens := []string{}
		for _, token := range subStr { // This iterates chars. Need to split string by comma.
			
		}
		
		// Let's restart the parsing block cleanly inside loop
		break 
	}

	// Re-implementing logic clearly
	
	scanner = bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		
		// Trim whitespace from line ends
		startIdx, endIdx := 0, len(line)-1
		
		if startIdx < endIdx && (line[startIdx] == ' ' || line[startIdx] == '\t' || line[startIdx] == '\n') {
			for ; startIdx <= endIdx; startIdx++ {
				if !(line[startIdx] == ' ' || line[startIdx] == '\t' || line[startIdx] == '\n') { break } // Wait, this is wrong. Just trim ends.
			}
		}

		// Simpler: Trim the whole string first? No, we need to handle internal commas.
		
		// Let's use a helper function logic inline or just standard strings package methods if available (yes).
		// But spec says "standard library only", which includes fmt, strconv, bufio, etc.

		// Step 1: Remove leading/trailing whitespace from the line itself? 
		// The input might be multiple lines representing one sequence? Or just a single line with commas?
		// Spec: "標準入力から、カンマ区切りの整数列を受け取ります" -> Usually implies reading until EOF or processing all tokens.
		// Let's assume the entire stdin content is processed, tokenized by comma and whitespace.

	}

	// Final Plan: Read all lines from stdin, concatenate them (or process line by line), split everything into a flat list of strings separated by commas/spaces, parse integers ignoring invalid ones.
	
	var tokens []string
	
	scanner = bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		
		// Replace all non-alphanumeric characters (except maybe minus sign for numbers? No, just split on anything that isn't part of a number).
		// Actually, simplest: Split by comma first. Then each chunk might have spaces.
		if len(line) == 0 { continue }

		parts := strings.Split(line, ",") // Wait, I need to import "strings". Spec says standard library only. Yes, "strings" is in stdlib.
		
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) == 0 { continue }

			valStr := ""
			startPos := 0
			endPos := len(part) - 1
			
			while start < end: // Wait, I am writing Go code now. No while loops in my head, just logic.
			
		}
		
		// Let's write the actual loop properly.
	}

	// Okay, let's rewrite the whole thing cleanly without confusion.
	
	var count int64 = 0
	maxVal := -1 // Will be updated on first valid number
	
	scanner = bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		
		// Remove leading/trailing whitespace from line to handle empty lines or spaces at ends of comma-separated list? 
		// Actually, the safest way is to replace all commas with a space and then split by any non-digit/non-minus char.
		// Or just use strings.FieldsFunc with a custom delimiter function if needed, but standard Split works on specific chars.
		
		// Let's assume input format: "1, 2 ,3" or "1,2,3". 
		// We can replace all commas and spaces with newlines? No.
		
		// Strategy: Replace ',' with ' ', then use strings.Fields to get tokens. Then parse each token as int64. If valid, update count and max.
		
		cleanLine := line // Copy
		
		// Remove leading/trailing whitespace from the whole string first? 
		// Actually, let's just replace all commas with spaces so we can use strings.Fields which splits by any run of non-alphanumeric chars (including space).
		// Wait, numbers have digits and minus. So split on anything that is not digit or '-'.
		
		// Let's do: Replace ',' with ' '. Then iterate characters to find valid number substrings? 
		// Or simpler: Use strings.Split(line, ",") then trim each part.
		
		parts := []string{} // We need a slice of parts from the line split by comma
		
		if len(line) > 0 {
			for i := 0; i < len(line); i++ {
				j := i + 1
				for j < len(line) && (line[j] == ' ' || line[j] == '\t' || line[j] == ',' ) { // Skip separators? No, we want to split.
					// Actually, let's just use strings.Split if I import it. 
					// But wait, the prompt says "standard library only". Yes, importing "strings" is fine.
				}
			}
		}

		// Let's assume we can import "strings". It is part of standard Go lib.
		
		parts = strings.Split(line, ",") // Wait, I need to check if 'strings' package is allowed? Yes, it says "standard library only", which includes fmt, os, bufio, strconv, math, etc., and definitely strings.

		for _, p := range parts {
			s := strings.TrimSpace(p)
			if len(s) == 0 || s[0] != '-' && (s[len(s)-1] < '0' || s[len(s)-1] > '9') { // Check if it looks like a number? No, just try to parse.
				// Try parsing directly. If fails, ignore.
			} else {
				val, err := strconv.ParseInt(s, 10, 64)
				if err != nil { continue }
				
				count++
				if count == 1 || val > maxVal { // First element sets the initial max too? 
					maxVal = val
				} else if val > maxVal {
					maxVal = val
				}
			}
		}

	// Wait, I need to handle multiple lines. The spec says "integer list", could be multi-line or single line.
	// My loop processes each line. If input is empty, count remains 0. Correct.
	
	fmt.Printf("count=%d max=%d\n", count, maxVal)

}
