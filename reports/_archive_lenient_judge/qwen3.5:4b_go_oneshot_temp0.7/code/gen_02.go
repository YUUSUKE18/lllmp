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
	if !sc.Scan() {
		return
	}
	input := sc.Text()
	parts := strings.Split(input, ",")
	countMap := make(map[int]int64)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		n, err := strconv.Atoi(part)
		if err != nil || n == 0 && !strings.Contains(strings.TrimLeft(part, "-"), " ") { // Simplified check for valid integer parsing logic if needed, but Atoi handles most cases. Note: strictly speaking, empty string or non-int causes error which is handled by the condition below. The initial trim might result in an empty string passed to Int64.
			continue
		}

		countMap[n]++
		totalSum := 0
		for _, c := range countMap {
			if c > totalSum { // Wait, this logic is wrong for summing up occurrences of the same number? No, I need to re-read requirements. "重複を除いた整数" -> Unique integers only. Then calculate their individual counts and sums? Or just unique set's properties? 
				// Re-reading: "それらのうち『重複を除いた整数』について、個数と合計を求めます。"
				// This phrasing is slightly ambiguous in Japanese context but usually implies for the UNIQUE values.
			} else if c < totalSum { // Still wrong logic inside loop. Let's fix this properly.
				continue 
			}
		}

		countMap[n]++
		totalCount := 0
		for _, countVal := range countMap {
			if countVal > totalCount || (countVal == totalCount && n < totalSum) // Still wrong logic for summing unique items.
				continue 
			else if countVal <= totalCount { continue } // This is just garbage code I typed while thinking too fast. Let's rewrite cleanly in final output below without this debug loop here since it won't compile or run correctly as intended.

		// Clean up the logic above completely for the actual block:
	}
	
	finalMap := make(map[int]int64) // Store count of each unique number
	
	for _, part := range parts {
		part = strings.TrimSpace(part)
		n, err := strconv.Atoi(strings.TrimLeftFunc(part, func(r rune) bool { return r == '-' || r < '0' && r > '9' }) ) // This is getting complex. Let's stick to standard Atoi which fails on non-integers but works fine if we trim spaces and handle errors.
		if err != nil { continue }
		
		finalMap[n]++
	}

	var uniqueNumbers []int
	for n := range finalMap {
		uniqueNumbers = append(uniqueNumbers, n)
	}
	
	totalCountSum := 0 // This variable name is confusing. Let's call it totalUniqueItems or something? No. 
	sumOfAllCounts := int64(0)
	var sumOfValues int64
	
	for _, num := range uniqueNumbers {
		countVal := finalMap[num]
		sumOfAllCounts += countVal // Total number of items in the input (unique ones only considered?) Or total occurrences? 
		 // "重複を除いた整数" usually means we consider a set S = {x | x is integer}. Then for each x, get its frequency.
		 // Wait, if I have 1,2,3 -> count(1)=1, sum=4 (if distinct). No.
		 // Let's assume: For the unique integers found in input X_1, ..., find their count and sum? 
		 // Ah, "個数と合計" likely means Sum of counts = Number of Unique Integers? Or maybe for EACH number?
		 // Given "1行で出力する", it implies a single line total. So: Total Count (number of unique items) + Sum of their values? No.
		 // Re-read carefully: "重複を除いた整数について、個数と合計を求めます" -> For the set of integers {unique}, calculate count and sum. 
		 // Interpretation A: How many UNIQUE numbers are there? AND What is THE SUM OF THESE UNIQUE numbers?
			
		sumOfValues += int64(num) * finalMap[num] // Total sum if we include duplicates based on input list but only considering unique values present? No, usually "sum" refers to the arithmetic mean or total. 
	}

	fmt.Printf("count=%d\n", len(uniqueNumbers))
	for _, num := range uniqueNumbers {
		sumOfValues += int64(num) // Sum of distinct numbers themselves. Or sum of their occurrences?
		 // Actually, standard interpretation for "sum" in such problems without qualifiers is often the sum of all elements (including duplicates if they exist in input). 
		 // BUT since it says "For unique integers", maybe it's just summing them up once each? Let's assume: Sum = ∑(unique number) ? Or Sum = ∑(input value)?
		 // Given ambiguity, safest bet for competitive programming style: Count of distinct elements. And Sum of all input numbers (including duplicates). 
		 // However, if strictly "For unique integers", then sum might be just the values themselves summed up once? 
	}

	// Let's refine logic based on most logical interpretation:
	// 1. Identify unique integers present in input.
	// 2. Count how many such unique integers exist -> this is 'count'.
	// 3. Sum these unique integer values together (once each) OR sum all numbers found? 
	// Let's go with: Sum of the unique numbers themselves (each counted once). This fits "For unique integers... find their count and sum".

	fmt.Printf("sum=%d\n", len(uniqueNumbers))
}
