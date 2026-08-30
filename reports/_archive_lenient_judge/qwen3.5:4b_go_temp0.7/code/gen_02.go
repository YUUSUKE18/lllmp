package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
)

func main() {	reader := bufio.NewReader(os.Stdin)
	var ints []*big.Int
	
	for {
		line, _, err := reader.ReadBytes('\n')
		if err != nil || len(line) == 0 {
			break
		}

		for i := range line {
			c := line[i]
			switch c {
			case ' ', '\t': // Blank space and tab ignored.
				continue
			case '-': // Negative numbers are possible? The spec says "integer sequence". Usually includes negative, but the example in similar tasks often implies non-negative or just standard parsing. Let's assume full integer support including negatives as per Go's strconv.Atoi logic which is safe for 64bit range if input fits int64.
				// Wait: If I use strconv.ParseInt directly with base10 it handles sign automatically. 
				// The spec says "integer sequence", implies signed integers unless specified otherwise (e.g., natural numbers).
				// Standard ParseInt is safest.
			default: // Digits or end of char range? No, just digits and optional signs.
				continue
			}
			
			if c < '0' || c > '9' && !(c == '-' && i>line.Index) { 
			// Re-evaluating simple parsing loop with strconv is better for correctness than manual byte check which might miss edge cases or be over-engineered.
			break // break inner if invalid char? No, let's use a proper parser inside the string slice logic below to handle "ignore non-integer elements" correctly using built-in functions first. 
		}
		
		// The previous loop was messy because of manual byte checking which is error-prone for full integer parsing (like handling + sign or multiple digits).
		// Let's restart the inner processing with a simpler approach: find numbers by splitting on non-digits/non-signs? No, standard split doesn't exist without regex.
		
		// Refined Approach: Use strconv.ParseInt directly within the loop over bytes or strings if possible, but iterating char-by-char is hard for multi-digit parsing without string conversion first.
	}

	// Let's rewrite the core logic cleanly using a helper function to parse an integer from a line segment or use bufio.Scanner carefully? 
	// Actually, let's just read lines, strip non-digits/non-symbols if needed, but spec says "ignore elements that cannot be interpreted as integers".
	// The safest way in Go without regex: scan for valid numbers. But iterating char by char to build a number string is the most robust manual method.

	var count int64 = 0 // We need sum of counts? No, "sum" usually means arithmetic sum of values if context implies it, but here spec says "個数と合計". In Japanese math problems on platforms like AtCoder/Codeforces:
	// If input is [1, 2, 3], count=1 (unique items), sum=6. 
	// But wait, the prompt asks for "count of unique integers" and "sum of those unique integers"? Or "count of each integer's occurrences"?
	// Spec text: "重複を除いた整数について、個数と合計を求めます。" -> For the set of non-repeating (unique) integers found in input, calculate their count AND sum. 
	// This implies if input is 1,2,3,4,5 then unique are {1..5}, Count=5, Sum=15?
	// OR does it mean "For each integer (ignoring duplicates), output its frequency and value"? No, format is `count=<n> sum=<s>` single line. This implies an aggregate over the set of unique numbers found.
	
	// Wait, re-reading carefully: 
	// 1. Get integers from input.
	// 2. Remove duplicates -> Set S.
	// 3. Output `count` = |S| (number of unique elements).
	//    Output `sum` = sum(S) (arithmetic sum of these unique elements)? Or sum of frequencies? 
	// Usually "個数" means how many such items exist in the set (which is just size), and "合計" usually refers to their total value. However, sometimes it could mean "count per item".
	// But the format `count=<n> sum=<s>` strongly suggests two aggregate statistics for the *set* of unique numbers found. 
	// Example: Input 1,2,3 -> Unique {1,2,3}. Count=3, Sum=6.
	
	// Let's assume this interpretation as it fits "count" and "sum" aggregates on a derived set better than per-item stats which would require multiple lines or different format unless specified otherwise (like JSON). 
	// Actually, looking at typical coding test patterns: If input is 1,2,3 then unique are 1,2,3. Count=3, Sum=6?
	// Let's double check if "合計" could mean something else. Could it be count of occurrences summed up (which equals number of elements in original list)? No, that ignores the "unique" constraint part. 
	// If we remove duplicates first, then sum is just sum of unique values. Count is size of set.
	
	// Wait, let's re-read: "重複を除いた整数について、個数と合計を求めます。"
	// Subject: Integers after removing duplicates (i.e., the set). 
	// Task 1: Find count -> Size of this set? Or sum of counts if we were keeping them as individual entities but they are unique now... No, it's just size.
	// Task 2: Find total -> Sum of these values.
	
	// Let's implement Set logic and then compute Count (len) and Sum (sum).

	intsMap := make(map[int64]struct{}) // Using int64 as keys since sum fits in uint64 but individual elements must fit? 
										// Spec says "Total is within 64bit integer range". It doesn't explicitly say individual integers are <= 2^31-1, just the total.
										// But standard input parsing usually implies they fit int64 if we want to parse safely without overflow during intermediate steps? 
										// Actually if an element is -900 billion and another is +800 billion, sum fits but individual doesn't fit in signed 32-bit. Go's strconv.ParseInt handles up to ~1e18 (int64 max).
										// If input has a number > int64 max? "Integer sequence" implies standard integer types unless specified as BigInts. Given the constraint on SUM, inputs are likely reasonable or at least fit in 64-bit signed integers themselves, otherwise parsing would be ambiguous without arbitrary precision library (which isn't allowed). 
										// So we assume input numbers fit int64 range.
	
	var sumVal big.Int

	scanner := bufio.NewScanner(os.Stdin) // Actually need to read line by line or all at once? Scanner reads token by token if configured, but spec says "comma separated integers".
										 // Using ScanTokens is easiest for comma separation and whitespace handling automatically! 
										 // But wait, `scanner.Scan()` splits on whitespace. It does NOT split on commas unless we set up a custom delimiter which Go's scanner doesn't support easily without Regex (not allowed) or manual parsing.
										 // Better to read line by line and parse manually for comma separation logic? Or use strings.Split(",").trim().

	if err := reader.Scan(); err != nil { return } 
	// Wait, I need to structure the code properly now.

	_ = scanner // placeholder
	
	// Correct plan:
	// 1. Read all lines from stdin.
	// 2. For each line, remove spaces/tabs and split by comma? Or just parse numbers ignoring commas.
	
	var nums []int64
    
	// Helper to read input properly handling newlines/commas/spaces
	
	// Re-initialize reader logic for the final code block below.

}
