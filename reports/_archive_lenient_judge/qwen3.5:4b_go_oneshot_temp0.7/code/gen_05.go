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
	tokens := strings.Split(input, ",")

	countsMap := make(map[int]int64) // Use int for key to ensure uniqueness in map iteration or just use a slice and sort later. But since we need unique integers only once per integer value? Wait.
	// Re-reading spec: "重複を除いた整数" -> Unique integers from the input list.
	// So if input is 1,2,3, then for each number (which must be unique because of 'unique'), count=1, sum=sum of those numbers.
	// Wait, does it mean "count how many times a specific integer appears"? No, "重複を除いた整数" means the set of integers without duplicates.
	// So if input is 1,2,3 -> Output: count=3 sum=6
	// If input is 1,2,1,3 -> Unique are 1,2,3. Count should be based on unique items? Or does it mean "for the set of unique numbers"?
	// Let's re-read carefully: "それらのうち『重複を除いた整数』について、個数と合計を求めます。"
	// Interpretation A: Take all integers in input, remove duplicates (get a list/set). Count = size of this set. Sum = sum of elements in this set.
	// Example Input: 1,2,3 -> Output: count=3 sum=6
	// Example Input: 1,1,2 -> Unique are {1, 2}. Count=2? Or is it "count for each unique number"? The prompt asks for a single line output `count=<n>`. This implies aggregate stats.
	// So it's likely: Filter input to keep only one instance of each integer. Then count how many such integers exist, and sum them up.

	values := []int64{} // Using int64 as per spec "合計は 64bit" though inputs fit in whatever, but let's be safe with sums? Input numbers themselves might not exceed int32 usually for these examples, but key type matters.
	// Actually simpler: just store unique values found.

	found := make(map[int]bool) // Using int as value is fine unless input has huge ints beyond 64-bit which Go handles automatically in reading logic if we parse carefully, but spec says sum fits in 64bit, so elements likely fit too.
	
	// Re-parse loop to handle potential large integers correctly with string parsing first then converting?
	// strconv.ParseInt returns error for overflow (which shouldn't happen based on "sum fits" implying inputs are reasonable), 
	// but let's stick to standard int64 logic or just use big.Int if needed? The prompt says sum fits in 64bit, so elements must fit.

	processed := []int{}
	
	for _, token := range tokens {
		token = strings.TrimSpace(token) // Remove surrounding whitespace from comma-separated items too (e.g., "1 ,2")
		
		if len(token) == 0 || !strings.HasPrefix(token, "-") && !token[0] >= '0' && token != "-" { 
			// Wait, ParseInt handles leading '-' and non-digit chars? No.
			// Let's just use strings.Fields on the comma split or manual trim inside loop if needed.
			// The spec says "blank elements ... ignore". So empty tokens after splitting by , should be skipped.
			if token == "" { continue }

			val, err := strconv.Atoi(token) // Atoi handles leading/trailing whitespace? No. It panics or returns error on non-int chars like "+1" unless handled? Actually ParseInt does handle signs and ignores nothing else but it fails on "abc". 
			// Better to use strings.TrimSpace then check if digit starts.
			
			val, err := strconv.ParseInt(token, 10, 64) // Explicitly ask for int64 to be safe with sum logic later? Or just int since Atoi is used in example and spec implies simple ints. Let's assume standard integer range unless specified otherwise. The prompt says "sum fits in 64bit", elements likely fit too.
			if err != nil { continue } // Ignore unparseable
            
			// Check if already added to unique set? 
			// Wait, the logic is: Get all integers -> Remove duplicates (create a new list/set of UNIQUE values). 
			// Calculate Count = Size of this Set. Sum = Sum of elements in this Set.
			
			if !found[val] {
				found[val] = true
				process := append(process, val) // Wait, better to accumulate directly into sum and count later? No need to store list if we just add to map and then iterate.
				
				// Actually simpler: Use a map[int]int64 where key is value (already unique), value is 1 initially. Then sum up keys.
			} else {
				continue // Already added, skip duplicates? 
				// Wait, if I use `found[val] = true` only once per integer encountered in the loop over tokens, then yes.
			}
		}

		// Correct logic implementation inside main:
		break; // Just placeholder to stop thinking and write code below properly.
	}
	
	// Rewriting clearly:
	uniqueInts := make(map[int]int) // Key: integer value, Value: 1 (since we want count of unique items? Or just store them in a slice later?)
	// No, if I encounter '5' twice in input "5,6,7", the first time it goes to map. Second time ignore. 
	// Then iterate over keys -> Count = len(keys), Sum = sum(keys).

	for _, t := range tokens {
		t = strings.TrimSpace(t)
		if t == "" || !strings.HasPrefix(strings.TrimLeftFunc(t, func(r rune) bool { return r < '0' && r != '-' }, "") , []string{"-", "1", "2"})... 
		// Simpler: just try ParseInt. If fails continue.
		
		v, err := strconv.Atoi(t) // Atoi might fail on "+5" or non-digits? Yes. Let's use custom check or TryParseInt with base 0? No, spec says "整数". Usually signed decimal. 
		if err != nil { continue }

		// Store in map to ensure uniqueness
		if _, exists := uniqueMap[v]; !exists {
			uniqueMap = append(uniqueMap, v) // Wait no, Map doesn't store order or duplicates? It stores keys uniquely.
			// Let's use a slice of ints and add if not present.
		} else {
			continue 
		}
	}

	// Re-doing the loop logic cleanly:
	
	vals := []int{} // Will hold unique integers
	
	for _, t := range tokens {
		t = strings.TrimSpace(t)
		if t == "" { continue }
		
		v, err := strconv.Atoi(t) 
		if err != nil { continue }

		foundVal := false
		for i := 0; i < len(vals); i++ {
			if vals[i] == v { foundVal = true; break }
		}
		if !foundVal {
			vals = append(vals, v) // Add unique value to list
		}
	}

	count := len(vals)
	sum := 0
	for _, x := range vals { sum += x }

	fmt.Printf("count=%d sum=%d\n", count, sum)

// Final clean code version:
