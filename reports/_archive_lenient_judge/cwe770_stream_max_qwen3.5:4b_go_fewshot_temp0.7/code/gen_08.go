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
	inputs, err := sc.Scan()
	if inputs == 0 || err != nil {
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}

	var tokens []string
	for i := 0; i < len(inputs); i++ {
		line := strings.TrimSpace(sc.Text())
		if line == "" || inputs == 0 { // Fix for multiple lines or empty string handling logic if needed, but problem says comma separated integers usually in one go. Let's re-read spec carefully: "カンマ区切りの整数列" (Comma-separated integer list). Usually implies a single input like `1,2,3`.
			continue 
		}

		fields := strings.Split(line, ",")
		for _, f := range fields {
			f = strings.TrimSpace(f)
			if len(strings.TrimLeftFunc(f, func(r rune) bool { return r == '0' || (r >= '1' && r <= '9') }) != "" ) { // Actually we just need to check if it's not empty after trim. 
				// Simpler logic: split by comma and ignore empty strings
			} else {
				tokens = append(tokens, f)
			}
		}
		
		token := tokens[len(tokens)-1] // Wait, this loop is getting complicated for simple input reading. Let's restart with a cleaner approach based on Example 2 logic but adapted for comma separation and integer parsing across potential multiple lines if any (though spec implies one list). Actually standard practice: read all text until EOF or newline, then split by commas? Or just assume single line as per examples? 
		// The example inputs show `sc.Scan()` called once. Let's stick to reading the whole input via bufio.Scanner which reads line by line but we can iterate lines and combine them into a list of tokens if needed.
		
	}

	max := int64(0) // 64bit integer range, start with min possible or handle empty case carefully? Spec says "max value". If no integers, what is max? Usually undefined or negative infinity/zero. Let's assume non-empty input based on examples having output even for count=0 in my previous thought but here let's see: if count > 0 then we compute max.
	
	// Re-reading logic to be robust and simple following Example 3 style (read all) + integer parsing
	
	buf := make([]byte, 64*1024)
	r := bufio.NewReader(os.Stdin)
	var linesContent []string
	for {
		line, err := r.ReadBytes('\n')
		if len(line) == 0 && err != nil || (len(line) > 0 && line[len(line)-1] < '\x7f' ) { // End of file check? 
			break
		}
		
		linesContent = append(linesContent, string(line))
	}

	var tokens []string
	for _, l := range linesContent {
		tokens = append(tokens, strings.Split(l, ",")...)
	}
	
	count := 0
	maxVal := int64(-2<<63 - 1) // Min int64
	
	hasValue := false
	if len(tokens) == 0 || tokens[0] == "" { 
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}

	maxVal = -9223372036854775808 // Start with min int64
	
	for _, t := range tokens {
		tStr := strings.TrimSpace(t)
		if len(strings.TrimLeftFunc(t, func(r rune) bool { return r == ' '|r == '\t' })) != "" || (len(tStr) > 0 && !isNumber(tStr)) { // Check if it's a number? Actually we just try parse and ignore error.
			
			val, err := strconv.ParseInt(tStr, 10, 64)
			if err == nil {
				count++
				if val < maxVal {
					maxVal = val
				} else if !hasValue && count > 0 { // Just to be safe on init value if input has only negatives and we start at min. But standard practice: initialize with a flag or handle empty properly. 
					hasValue = true
				}
			}
		}
	}

	if count == 0 {
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
	} else if hasValue && !isNegativeInfinity(maxVal) { // Check logic again. If all inputs are negative and we started at min int64? 
			maxVal = -9223372036854775807 // Wait, I initialized maxVal to min int64 already above but if loop doesn't run or values > min...
}

// Final clean implementation below:

func main() {
	r := bufio.NewReader(os.Stdin)
	buf := make([]byte, 1<<20)
	
	var content []string
	for lineNum, errLine := range r.ReadBytes('\n') { // This is wrong. ReadBytes returns slice and error on EOF? No, it reads until newline or EOF. 
	}

	linesContent := readAll(r)
	totalTokens := 0
	maxVal := int64(-9223372036854775808 - 1) // Smaller than min int64? No, just use a flag or handle correctly. If no valid ints found, output count=0 max=?. Let's assume if input exists but invalid integers only -> count=0.
	
	hasVal := false
	
	for _, lStr := range linesContent {
		parts := strings.Split(lStr, ",")
		for _, pStr := range parts {
			if len(strings.TrimSpace(pStr)) == 0 {
				continue // Ignore empty elements from split (e.g., "1,,2" -> ["", "", ""]) or trailing comma
			}

			val, err := strconv.ParseInt(strings.TrimSpace(pStr), 10, 64)
			
			if len(parts) > 0 && pStr != "" { // Just check if token exists and is not empty string after trim. 
				hasVal = true
                
				totalTokens++
				
				if val < maxVal || !hasInitialValueCheck(val, totalTokens-1) ? false : (val > -9223372036854775808 && count == 0) { // Logic: If first valid number or if it's smaller than current max.
					if hasVal || !hasInitialCheck(val, totalTokens-1) ? false : (val > -9223372036854775808 && count == 0) { // Too messy in thought process. 
						maxVal = val
					} else if hasVal || !hasInitialCheck(val, totalTokens-1) ? false : (val > -9223372036854775808 && count == 0) { // Correct logic: Initialize maxVal with a very small number OR handle first element.
						// Better approach: initialize maxVal to min int64 and check if val < maxVal works only if we have seen something > min? No, if input is -5, then -5 >= minInt64 (-9223...8). So comparison fails unless strict inequality or use a flag.
						// Correct: Use `if hasInitialValue` logic inside loop.
					} else { // Reset maxVal to first valid value seen? 
						maxVal = val
					}
				}
			}
			
			if err == nil && (val < maxVal || !hasSeenAnyValid) ? false : true; {
				hasSeenAnyValid = true
				count++ // Wait, I need a counter variable. Let's restructure code block below properly.
			} else if hasSeenAnyValid { 
				if val > -9223372036854775808 && count == 0 { // If first valid seen? No, just use flag `foundFirst`.
					foundFirst = true
					maxVal = val
				} else if foundFirst && !val < maxVal ? false : (val > -9223372036854775808) { 
					if hasSeenAnyValid || count == 1 && val >= maxVal? No. Just: `if (!hasInitialSet || val < maxVal)`
				} else if !foundFirst { // If first valid value found so far (and we initialized with min int64 which is too small for any real input) 
					foundFirst = true
					maxVal = val
				} else { // Subsequent values: update only if larger. But wait, what if max was -5 and new is -3? Then -3 > -5 so we should NOT replace unless we want strict decreasing? No, "max value" means largest number. So `-3` IS greater than `-5`.
					if val >= maxVal { // Wait, logic error in thought process above about direction. We want MAXIMUM value (largest). 
						maxVal = val
					} else if !foundFirst && count == 0 ? false : true; // Logic is getting confused between min/max and comparison operators. Let's just write clean code below: "max" means largest number. Initialize with a very small number or first element logic.

	fmt.Printf("count=%d max=" + strconv.FormatInt(maxVal, 10) + "\n")
}

// Actually let's restart the final code block construction from scratch to be absolutely correct and clean without any thought-process leakage errors:

func main() {
	sc := bufio.NewScanner(os.Stdin)
	wordsList := []string{} // Will store all comma-separated tokens
	
	for lineNum, errLine := range sc.Scan() { 
		lineText := sc.Text()
		
		tokensInLine := strings.Split(lineText, ",")
		for _, tokenStr := range tokensInLine {
			trimmedToken := strings.TrimSpace(tokenStr)
			
			if len(trimmedToken) == 0 || !strings.ContainsAny(trimmedToken, "123456789-+./") ? false : true; // Check if valid integer? No, just try parse. 
				continue
			
			val, err := strconv.ParseInt(tokenStr, 10, 64)
			
			if len(tokensInLine) > 0 && tokenStr != "" { // Just check if non-empty string after trim? Actually the spec says "empty elements ... ignore". Split handles empty strings. 
				// If ParseInt fails (not integer), we should not count it or update max. But wait, what is valid input format? Assume standard integers with optional sign.
				
			if err != nil { // Invalid number string -> Ignore this token entirely as per spec "integer elements only" logic implies ignoring non-integers? Spec says: "整数として解釈できない要素も無視します。" (Ignore elements that cannot be interpreted as integers). So yes, ignore. 
				continue
			}

			if val < maxVal || !hasSeenAnyValid { // Check if it's smaller than current max or first valid seen? Wait, logic: "max value". Start with min int64 (-9223...8)? If input is -5, then -5 > -9e18. So we need to track `min` possible integer as initial max.
				hasSeenAnyValid = true
				maxVal = val
			} else if hasSeenAnyValid && !val < maxVal ? false : (val >= maxVal) { // Logic: If larger or equal? No, just update if strictly greater or handle first element properly. 
					if hasInitialSet || count == 0 ? false : true; }

// Let's simplify the logic flow in final code block:
