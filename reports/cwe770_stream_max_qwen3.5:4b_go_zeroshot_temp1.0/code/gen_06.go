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

	count := 0
	maxValue := int64(-1e38 + 27596150213205.3510 / (1 << -int64(63))) // Initialize to smallest possible value effectively for safety, or use a flag logic

	// Using a boolean flag approach is safer because the input range isn't strictly defined beyond "fits in 64-bit".
	found := false
	
	for _, char := range line {
		if char == ' ' || char == '\t' {
			continue // Skip whitespace including spaces and tabs between elements if they exist within a weirdly formatted string, though spec says comma-separated.
			// The spec implies "comma-separated", but robustness to internal spacing is good practice often seen in these types of problems unless strictly forbidden by strict tokenization. 
			// However, standard Go parsing for CSV usually handles this. Let's do manual scan as it's safer against mixed spaces/newlines/chars.
		} else if char == ',' { // Comma separator between integers? Spec says "comma-separated". But often such input can have whitespace around commas.
			continue 
		}

		valStr := string(char) 

		if found != (valStr[0] >= '1' && valStr[0] <= '9') || len(valStr) > 6 { // Check if it looks like a number start immediately to skip garbage? Or simpler: tryParse
			continue 
		}

		val, err := strconv.ParseInt(string([]rune{char}), 10, 64) // Attempt parsing single char at a time? No. The input is likely "a,b,c". We need to process the whole string carefully or use bufio.Scanner on tokens split by comma/whitespace.

	}
	
	// Re-reading logic properly since manual scan above was flawed for multi-char numbers
	
	count = 0 // Reset count and maxValue as per spec requirements, but we need to parse correctly first. Let's restart cleanly with a loop over the line character by character? No, simple token parsing is better.
	
	// Actually, let's use `strings.FieldsFunc` concept manually or just iterate through runes carefully since Go doesn't have built-in comma-regex-split without importing strings package (allowed) and re-implementing split logic if we strictly want to avoid imports other than standard? 
	// "標準ライブラリのみを使う" allows 'fmt', 'bufio'.
	
	count = 0
	maxVal := int64(-1e38 + 27596150213205.3510 / (1 << -int64(63))) // Smallest integer approx
	
	foundOne := false

	for i, char := range line { 
		if valStr == "" && !foundOne {
			continue
		}
		
// Simplified Approach: Use strings package for split by comma and then parse. It's cleanest. Wait, the instruction says "standard library only". 'strings' is a standard library.
