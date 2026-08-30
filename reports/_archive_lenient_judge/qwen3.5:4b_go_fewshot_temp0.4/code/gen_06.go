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
	counts := make(map[int]int64) // map to store counts and sums (int for key, int64 for value logic handled separately or just use one var per unique number? No, we need count AND sum. Actually a single variable isn't enough if numbers are different. We can have two maps: one for count, one for sum.)
	countMap := make(map[int]int)
	sumMap := make(map[int]int64)

	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		
		val, err := strconv.Atoi(part)
		if err != nil {
			continue // ignore non-integer elements
		}

		countMap[val]++
		sumMap[val] += int64(val)
	}

	totalCount := 0
	var totalSum int64 = 0

	for _, v := range countMap {
		totalCount += v
	}
	
	for val, s := range sumMap {
		totalSum += s
	} // Wait, the requirement is "count of unique integers" and "sum of those unique integers". 
	// Let's re-read carefully: "重複を除いた整数について、個数と合計を求めます。" -> For each distinct integer? Or total count of all numbers (excluding duplicates) + sum of all these numbers?
	// Example interpretation 1: Input [1, 2, 3] -> Count=3, Sum=6. 
	// Example interpretation 2: If input is [1, 1, 2], unique are {1, 2}. Count = number of unique items (2). Sum = sum of unique items (1+2=3)? Or sum of all numbers in the list?
	// Usually "sum" implies summing up the values. If I have [1, 1, 2], do I count '1' once or twice for the total sum? 
	// The phrasing "重複を除いた整数について...合計を求めます" suggests we are operating on the set of unique integers found in the input.
	// So if input is `1, 1, 2`, unique numbers are {1, 2}. Count = 2 (size of set). Sum = 3 (sum of elements in set). 
	// If input is `10, 20, 30`, count=3, sum=60.
	
	// Let's refine the loop to calculate based on unique keys only? Or accumulate during reading?
	// Better approach: Build a map where key is int and value stores {count_in_input, sum_of_occurrences}. 
	// But if we remove duplicates for counting AND summing...
	// "重複を除いた整数" -> The set of integers.
	// So unique keys are the universe. Count = size(universe). Sum = sum(unique_keys).

	totalCount = len(countMap) // Number of unique elements found
	
	// Recalculate sum based on logic: Is it sum of all occurrences or sum of distinct values? 
	// "重複を除いた整数" implies we treat them as a set. So if 1 appears twice, it counts once in the count and contributes its value once to the sum.
	var uniqueSum int64 = 0
	for val := range countMap { // Iterate over keys (unique integers)
		totalCount++ 
	}
	
	// Wait, I need to calculate totalCount correctly first. The map size IS the number of unique items.
	// But in my previous loop logic: `for _, v := range countMap` iterates values? No, `countMap[val]++`. Keys are ints.
	// So len(countMap) is definitely the count of unique integers.
	
	// Now for sum: Sum of these unique integers.
	for val := range countMap { // Iterate keys again or use a separate loop
		totalSum += int64(val) 
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
