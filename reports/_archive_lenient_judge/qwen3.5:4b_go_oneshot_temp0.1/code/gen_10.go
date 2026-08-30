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
	counts := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ (key: integer, value: count + sum? No. Need separate tracking or combine logic carefully.)
	// Wait, the requirement is "count=<unique_count> sum=<total_sum>". 
	// It says "those among which unique integers are removed". This phrasing is slightly ambiguous.
	// Interpretation A: For each integer that appears in the input (after removing duplicates from the set of numbers), calculate its count and add it to a total sum? No, usually "sum" implies summing up all elements or something specific.
	// Let's re-read carefully: "重複を除いた整数について、個数と合計を求めます". 
	// This likely means: Identify unique integers present in the input. For each such integer X, we have a count (frequency) and maybe its contribution to sum? Or is it asking for the total number of UNIQUE elements AND the SUM OF ALL ELEMENTS?
	// Let's look at standard problems like this. Usually "count" refers to the number of unique items found in the list. And "sum" refers to the arithmetic mean or something else? 
	// Actually, looking at similar Japanese coding challenges: Often it means "Count how many distinct numbers are there?" and "What is their sum?".
	// Example logic: Input [1, 2, 3], Output count=3 (distinct), sum=6.
	 // If input has duplicates like [1, 1, 2], unique set is {1, 2}. Count = 2. Sum of these unique numbers? Or sum of all elements including duplicates? 
	// "重複を除いた整数について" -> Regarding the integers after removing duplicates (i.e., considering only distinct values).
	 // So if input is [1, 1, 2], we consider {1, 2}. Count = 2. Sum could be 3 (1+2) or maybe sum of frequencies? 
	 // Given "合計" usually means arithmetic sum. If it meant frequency sum, it would say "個数の和".
	 // Let's assume: count = number of unique integers found in the input list. sum = sum of all those unique integers.
	 // Wait, another interpretation: For each distinct integer x, we have a count (how many times it appears). Is there an aggregation? 
	 // "個数と合計を求めます" -> Find 'count' and 'sum'. Singular outputs suggest one total count and one total sum for the whole set of unique numbers.
	 // Let's assume: Count = number of distinct integers in input. Sum = sum of all elements (including duplicates)? Or sum of distinct values? 
	 // Re-reading "重複を除いた整数について": It modifies the subject. We are talking about the set S where S is {x | x appears in input}.
	 // Then for this set, find count(S) and Sum(S). This implies Count = size of unique set, Sum = sum of elements in that unique set (each counted once). 
	 // Example: Input "1, 2, 3". Unique: {1, 2, 3}. Count=3. Sum=6.
	 // Example: Input "1, 1, 2". Unique: {1, 2}. Count=2. Sum=3 (if sum of unique) or Sum=4 (if sum of all). 
	 // Given the phrasing "重複を除いた整数について" (regarding integers after removing duplicates), it strongly suggests we operate on the set of unique numbers only.
	 // So, if input is 1,2,3 -> count=3, sum=6. If input is 1,1,2 -> unique are 1,2 -> count=2, sum=3? Or maybe "sum" refers to something else? 
	 // Let's consider the phrase "個数と合計". In many contexts (like statistics), if you remove duplicates, you get a set. The 'count' of that set is its cardinality. The 'total' or 'sum' might be ambiguous without more context but usually implies summing the values in that filtered list.
	 // However, there's another possibility: "Count" = number of unique items. "Sum" = Sum of all original numbers? 
	 // Let's try to infer from typical problem patterns. If I say "Find count and sum for these integers", it usually means total distinct count and total arithmetic mean or something. But here it says "sum".
	 // Let's assume the most literal interpretation: Filter input to get unique values. Count how many there are (count). Sum them up (sum). 
	 // Wait, if I have 1, 2, 3 -> Unique {1, 2, 3}. Count=3. Sum=6.
	 // If I have 1, 1, 2 -> Unique {1, 2}. Count=2. Sum=3? Or is it possible the question implies: For each unique number x, calculate its frequency (count) and then sum those frequencies? No, that's weird. 
	 // Let's go with: count = number of distinct integers in input. sum = sum of all distinct integers found in input.
	 // Wait, could "合計" mean the sum of counts? i.e., if 1 appears twice, does it contribute to sum differently? No, that would be redundant. 
	 // Let's stick to: count = number of unique elements. Sum = sum of those unique elements (each added once).
	 // Actually, let's reconsider "重複を除いた整数について". It might mean we process the list by removing duplicates first. Then for this new list, find its length and sum. 
	 // Yes, that makes sense. List -> Remove Duplicates -> New List L'. Count = len(L'), Sum = sum(L').
	
	scans := strings.Fields(input) // Split by whitespace? No, input is comma separated integers like "1, 2, 3". But there might be spaces around commas or not. 
	// The example shows `strings.Fields` for space-separated. Here we have comma separation. We should split by `,`.
	
	numbers := strings.Split(input, ",")
	uniqueNumbers := make(map[int]int) // Map to store count of each number (to handle duplicates if needed later? No, just need unique set). 
	// Actually simpler: Use a map to track seen numbers and their counts. Then iterate the map keys for sum/count logic.
	
	countMap := make(map[int]bool) // Just existence check first? Or use int64 count? We only care about uniqueness eventually.
	seen := make(map[int]struct{})
	totalSum := 0
	
	for _, s := range numbers {
		s = strings.TrimSpace(s)
		if len(s) == 0 || !strings.ContainsAny(s, "-") && (s[0] >= '0' && s[len(s)-1] <= '9') { // Basic check? Better use strconv.
			continue 
		}
		
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		
		countMap[n] = true // Mark as seen
		
		totalSum += n // Wait, if we sum all numbers including duplicates here? Or only unique ones? 
		// If the logic is "Remove duplicates first", then we should not add to totalSum until after deduplication.
	}
	
	uniqueCount := len(countMap)
	sumOfUnique := 0
	
	for n := range countMap {
		sumOfUnique += n
	}
	
	fmt.Printf("count=%d sum=%d\n", uniqueCount, sumOfUnique)
