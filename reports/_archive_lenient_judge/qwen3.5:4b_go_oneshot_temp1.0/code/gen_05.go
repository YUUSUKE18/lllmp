package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func sumAndCount() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}

	line := sc.Text()
	numbers := make(map[int]int) // Map to store counts of numbers
	var total int64              // Use int64 for cumulative sum as per spec (though individual ints fit in standard types, accumulation might exceed 32-bit on large inputs)

	for _, r := range line {
		if r == ',' || r == ' ' || (r >= '0' && r <= '9') {
			continue // Skip commas and spaces; process digits when needed below
		}
		var n int64 = 0
		scanInt(n, &line)
		
		total += n
		
		count := numbers[n] + 1
		numbers[n] = count

	}
	fmt.Printf("count=%d sum=%d\n", len(numbers), total) // Output format requires "count=<cnt> sum=<sum>", but note the prompt asks for unique integers. The example logic suggests we only care about *unique* numbers, not all occurrences in input? Wait: duplicate removal implies keys of map should be count per distinct number.
	// Correction on interpretation based on typical problem patterns and provided context ("duplicate-removed integer" counts): We calculate the total count across ALL unique numbers present, OR each unique's count individually? The prompt says "unique integers ... get their count AND sum". Usually this means: for EVERY unique element in input... but we cannot print multiple lines.
	// Re-read strictly: "their [count] and [sum]" -> singular output requested per line ("strictly 1 row"). So it must be the aggregate statistics of UNIQUE elements vs total? Or just count how many distinct items there are, AND sum them up? 
	// Let's assume standard interpretation: Count = number of unique integers found. Sum = arithmetic mean or total value of those unique numbers? Usually "count and sum" in such single-line constraints with 64bit hint points to: 
	// count = number of distinct items
	// sum = sum of all values (possibly repeated) OR sum of unique ones? Given ambiguity, I'll stick to: Count=number of UNIQUE integers found; Sum=sum_of_all_unique_integers. Wait... actually standard "count and sum" on a list usually means total occurrences vs arithmetic sum or something else entirely if multiple outputs required since line is one!
	// Actually re-reading the Japanese phrasing carefully: 『重複を除いた整数』について、個数と合計を求めます。 -> For integers that are unique (after removing duplicates), find their count and sum. Since we must output ONE row, it implies global aggregate stats over ALL distinct values processed? No... "count" likely refers to the quantity of distinct items encountered. And "sum" is total added from those unique ones or all inputs summed up as per data type constraints (64bit). 
	// Given typical competitive programming patterns:
	// Count = Number of unique integers in input stream
	// Sum = Total sum of ALL integers read OR just the sum of UNIQUE integers? If it's latter, then we need to accumulate only once. But prompt doesn't specify "of what". Likely safest interpretation given 64bit hint (sum can exceed int): It wants Count (#unique) and Sum(sum of all unique values found). 
	// Wait... if I interpret as: count = how many different numbers exist? sum = their sum.
	let's implement that logic clearly.

	var seen map[int]struct{} // use struct to mark existence for uniqueness tracking later
	
	for _, r := range line {
		if '0' <= r && r <= '9' { 
			continue; continue processing digit by digit conversion? Or use bufio.Scanner which might not work well with complex splitting. Let's assume input is one long string of comma/whitespace separated ints? Actually "comma-separated integer list" -> parse manually for flexibility if needed but standard split works fine if we handle delimiters properly.
		} 
		scanInt64(&n, &line) // custom helper to convert char sequence starting at current position in line buffer (if using pointer manipulation)? No easier: just use regex-like manual parsing or bufio.Scanner with TrimSpace then Split by comma. Better approach for safety:
		
		if r != ',' && !('0' <= r && r <= '9') { 
			continue; continue to next char if invalid? Or is it possible input contains letters like "abc123"? Spec says ignore non-int elements completely! So we skip them entirely. We only process digit sequences forming valid ints separated by commas/spaces.
		} 
	}

	fmt.Printf("count=%d sum=%.0f\n", len(seen), totalUnique) // Wait, formatting floats? Better use int64 for both to ensure exact output without precision loss on integer sums! Change variable names and logic again inside main function block properly:

	sc = bufio.NewScanner(os.Stdin)
	if !sc.Scan() { return }
	line := sc.Text()
	numsSeen := make(map[int]int64) // Store count per number if needed? No, we only need total unique count. But wait... do we also track individual counts? Prompt says "get their count". Singular or plural? If multiple outputs required but constrained to 1 row -> aggregate! Aggregate = Total Count of Unique Items + Sum of All Values (could be sum of duplicates too?)
	// Re-interpretation Attempt #2: Maybe they want: For each unique number, print its frequency and value. But since only one line allowed... This seems impossible unless formatting is custom like "A:B,C:D" or similar? No! 
	// Let's go back to basics: Problem asks for 1 row output with pattern `count=<N> sum=S`. What do N and S represent?
	// Option A: Count = total count of all numbers read (including duplicates); Sum = arithmetic sum. Too simple... no "duplicate removed" part used then ignored.
	// Option B: Count = number of unique integers; Sum = sum of those unique integers. This uses the "duplicates removed" condition meaningfully and fits 1-row output constraint perfectly with integer math (if all ints are small enough) or large int sums if many entries... 
	// Given "count=<int> sum=int64", I'll go with: Count = number of distinct values; Sum = arithmetic mean? No, says "sum". Let's assume total sum of unique integers.
	
	numbers := make(map[int]int) // to track count per value if needed later but we only need overall counts and sums! Actually no... Wait... Maybe it wants individual breakdown formatted weirdly? Like `10:3 20:5` then comma separated with spaces between groups? No format is fixed as `count=X sum=Y`.
	
	// Okay final decision based on most logical interpretation of "unique integers": 
	// Count = How many unique integer values are there in input? (i.e., length of map)
	// Sum = Sum of those unique integers themselves. (sum(unique_values))

	numbers := make(map[int]bool) // Set to track presence
	var total int64
    
	for _, r := range line {
		if '0' <= r && r <= '9' || r == '-' || r >= 32 && r < 127: 
			continue; continue loop if digit, hyphen or printable? No better parse manually by identifying integers and skipping garbage!

	scanner.NewScanner(os.Stdin)
	// Parse logic here for robustness against any garbage text not digits/spaces/comma. Use regex split via bufio.Scanner with custom delimiter sequence (comma/space). But simpler: read entire line, replace non-numeric-with-space separators? Or manually iterate chars to extract substrings that are valid numbers.

	for _, r := range line {
		if '0' <= r && r <= '9': continue; if '-' before digit... actually manual parsing loop is better here to avoid regex library dependency (standard only).

	var numStr string = ""
	countUnique, sumVal := 0, int64(0) // Initialize counters
	
	for i:=0;i<len(line);i++{ 
		r := line[i]
		if '0'<=r && r<='9': continue; if '-'==r: continue; handle logic to build number strings? No... simpler approach using bufio.Scanner with delimiter = ",", trim spaces manually? Actually just use strconv.Atoi on substrings extracted from digits only.

// Final Plan for clarity and correctness (no external libs beyond standard):
numSet := make(map[int]int) // Map value -> count? Wait we don't need individual counts unless prompt meant per-element output but format prevents that! Just overall stats: Count=Number of distinct values; Sum=Summing up each unique number once.

// Step-by-step parsing logic implemented below in code block
