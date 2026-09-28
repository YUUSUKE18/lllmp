package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {	reader := bufio.NewReader(os.Stdin)
	line, _ := reader.ReadString('\n')
	
	var numbers = big.NewInt(0).Copy(&int{val: int64(-1)}) // Placeholder for initialization logic if needed, but Go's map handles zero correctly. Actually, let's use a clean approach with a set-like structure using maps or slices since we need counts and sums of unique elements.
	
	// Using a slice to store unique numbers encountered so far will be straightforward
	var nums []int64
	
	for _, ch := range line {
		if (ch >= '0' && ch <= '9') || ch == ',' {
			continue // Skip non-integer characters initially, but we need parsing logic. Let's rewrite the loop to parse integers properly.
		} else if ch != 13 && ch != '\n' { 
            // Ignore other chars? Spec says "integers cannot be interpreted are ignored". We'll try standard strconv.ParseInt and ignore errors/invalid tokens directly in a string iterator approach or manual parsing.
        }
    }

    // A better way for robustness: split by comma, trim whitespace, parse int64. If fail (not integer), skip.
    
    var parts []string
	for _, ch := range line {
		if ch == ',' || ch == ' ' || ch == '\t' || ch == '\n' && len(parts) > 0 { 
            // This manual splitting is error-prone with mixed inputs like "1 ,2 ". 
        }
    }

    // Let's implement a robust tokenizer or split logic manually to ensure we handle all whitespace and commas correctly without relying on Go strings.Split behavior if the input format varies slightly. However, standard library Split comma is usually best.
    
    rawTokens := []string{}
	// Manual tokenization for safety against mixed delimiters not just commas? 
    // Spec says "comma separated integer sequence". So split by ',' first might be safer to avoid splitting on spaces inside numbers if they exist (though unlikely in valid input). But spec implies comma separation. Let's assume CSV format with potential surrounding whitespace.
    
    tokens := []string{}
    start := 0
    for i, ch := range line {
        if ch == ',' || ch == ' ': // Treat space as separator too to be safe? Or just trim each token after split by comma? 
            if i > start && i < len(line) {
                tokens = append(tokens, line[start:i])
            } else if i+1 >= len(line) {
                 if start != 0 || i == len(line)-1 && (ch=='\n' || ch==0) { // Handle trailing chars
                     if start > 0 {
                         tokens = append(tokens, line[start:])
                     }
                 } else {
                    start = i + 1
                }
            }
        }
    }

    // Refined Split Logic: Replace commas with spaces or just use strings.Split(',') then trim. 
    // The spec says "comma separated". Let's stick to splitting by comma, trimming whitespace from each part, and parsing int64. If parse fails (non-integer), ignore it.
    
    rawTokens = []string{}
    currentRun := make([]rune)
    for _, ch := range line {
        if ch == ',' || ch == ' ': // Split on comma or space? Or just split by comma and trim each part? 
            // "Integer sequence, separated by commas". Usually implies tokens are integers. Whitespace might exist around them.
            currentRun = append(currentRun, nil) // Reset is not how rune runs work in Go loop like this easily without state machine.
        } else {
             if len(rawTokens) == 0 && ch != ' ' && ch >= 'a' || ... 
    }

    // Simplest robust approach given constraints:
    // Iterate char by char, build number digits until non-digit/non-comma found? No, spec says "comma separated". 
    // Let's use strings.Split(',') then map over results. But wait, what if there are no commas? e.g. single integer? Or multiple without comma but with space?
    // Spec: "standard input from a comma-separated integer sequence". This implies the structure is defined by commas. However, to be safe against trailing/leading spaces around numbers separated by commas or newlines (unlikely in CSV unless multiline). 
    // Let's assume standard string manipulation: Split(','). Then for each part, trim(). ParseInt64(i). If error -> ignore.
    
    parts := []string{}
    if len(line) > 0 {
        s := strings.Split(line, ",")
        for _, p := range s {
            // Handle multiple spaces? Trim handles it.
            t := strings.Trim(p, " ") 
            // Also handle case where there might be empty string due to consecutive commas or leading/trailing comma? Yes.
            if len(t) > 0 && !isDigitOrMinusFirstChar(t[0]) {
                 continue
            } else if len(t) == 0 || t == "-" { 
                // "-1" is valid, but "" is not an integer. But wait, "integer sequence". Empty string after trim means empty element -> ignore per spec ("empty elements ... ignored").
                continue
            }

            val := parseInt64OrSkip(t)
            if val == 0 { 
                // We need a flag to track valid numbers found? Or just use count > 0 check.
                 // Better: keep a boolean set of seen unique values to avoid double counting in the loop logic, or accumulate sum and count directly with validation inside.
             } else {
                 nums = append(nums, val)
            }
        }
    }

    // Now process the collected numbers 'nums'. Since we need "count of distinct integers", let's iterate over unique ones.
    
    if len(rawTokens) == 0 && line != "" { 
         // Re-evaluating parsing logic to be absolutely correct for any whitespace/comma mix?
         // Let's re-implement the split and parse cleanly in final code block below using strings.Split and TrimSpace/ParseInt64 with error handling.
    }

    var sum int64 = 0
    seen := make(map[int]bool) 
    distinctCount := 0
    
    for _, tokenStr := range tokens { // Assuming 'tokens' was populated correctly in the logic above (re-implementation needed inside function body or just using loop on line directly to be self-contained without extra vars if possible, but Go needs structure).
         val64, err := strconv.ParseInt(tokenStr, 10, 64) 
         // Actually 'tokenStr' comes from strings.Split(line, ",") then Trim. If error -> ignore.
    }

}
