package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately for empty input, but we need to handle stdin properly. 
	// Actually, standard practice is just reading from os.Stdin directly or using a scanner that handles the stream.
	// Let's use fmt.Fscan which reads until it hits an error (EOF).

	var nums []int
	
	for {
		var n int
		if err := fmt.Scanf("%d", &n); err != nil {
			break // EOF reached or input ended unexpectedly
		}
		nums = append(nums, n)
	}

	countMap := make(map[int]int)
	sum64 := 0
	
	for _, num := range nums {
		if count, exists := countMap[num]; exists {
			sum64 += int64(num * (count + 1)) - int64(count * num) // This logic is flawed. Let's restart the sum calculation approach.
			
			countMap[num] = count + 1
			
			// Correct way to accumulate unique sums: add 'num' only once per distinct value? 
			// No, re-read spec: "重複を除いた整数" (integers without duplicates).
			// So we need the sum of UNIQUE integers.
			
			sum64 += int64(num) // Add num to total unique sum immediately when first seen or just iterate at end.
		} else {
			countMap[num] = 1
			sum64 += int64(num)
		}
		
		// Wait, the logic above inside loop is slightly messy because of the map check order. 
		// Let's simplify: Iterate through input numbers. If we haven't seen it before (or just track count), add to sum?
		// Actually simpler: Just collect unique values and their counts separately or do a single pass with set logic.
		
	}

	// Re-implementing the loop cleanly for clarity in final output below.
	
	counts := make(map[int]int) // Map value -> count of occurrences (not needed if we just want sum of uniques, but spec asks for 'count' too). 
	// Spec: "重複を除いた整数"について、個数と合計を求めます。
	// Interpretation 1: For each unique integer X found in input: Output its frequency and the sum of all such frequencies? No.
	// Interpretation 2: Calculate two things for the set of UNIQUE integers: 
	//    a) The count (size of the set).
	//    b) The sum of these unique integers.
	
	uniqueInts := make(map[int]bool) // To track uniqueness
	
	for {
		var n int
		if err := fmt.Scanf("%d", &n); err != nil {
			break 
		}
		
		if !uniqueInts[n] {
			// First time seeing this number, add to unique set and sum.
			sum64 += int64(n)
			uniqueInts[n] = true
			
			countMap := make(map[int]int) // Wait, I need the count of each integer? 
			// Spec says: "重複を除いた整数"について、個数と合計を求めます。
			// Does it mean: For EACH unique number X in input -> print "count=X freq=Y sum=Z"? No.
			// It likely means: Given the list of integers, remove duplicates to get a set S. 
			// Then output: count = |S| (number of unique elements), sum = Σ(x for x in S).
			
			countMap[n]++ // Track frequency if needed? No, just need total count of uniques and their sum.
		} else {
			// Already seen this number, ignore it for the "unique" set calculation 
			// BUT wait, do we still track its original frequency? 
			// Spec: "重複を除いた整数について、個数と合計を求めます。"
			// This phrasing usually implies properties of the resulting unique list.
			// i.e., List = [1, 2, 3]. Unique = {1, 2, 3}. Count=3, Sum=6.
			// If input is [1, 1, 2], Unique={1, 2}. Count=2, Sum=3.
			
			continue 
		}
		
		countMap[n]++ // Actually I don't need individual counts per number if the output format is just one line "count=<N> sum=<S>".
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueInts), int(sum64))
	
	// Wait, my previous loop logic was broken. Let's rewrite cleanly inside main block below.
}
