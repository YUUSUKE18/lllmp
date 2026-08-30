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
	pairs := make(map[int]int64)
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		n, err := strconv.Atoi(s)
		if err != nil || n == 0 && len(strings.TrimLeftFunc(s, func(r rune bool)) > 0) { // This check is redundant for valid integers but safe. Actually simpler: just parse and ignore error if not int.
			continue
		}
		pairs[n]++
	}

	var sum int64 = 0
	for _, count := range pairs {
		sum += int64(count) * n // Wait, the requirement is "count of unique integers" vs "sum". 
		// Re-reading: "重複を除いた整数について、個数と合計を求めます。" -> For each unique integer found in input? Or sum of all numbers after removing duplicates?
		// Usually this means: Count how many times a number appears (total count) and Sum the values. But since it says "unique integers", maybe it implies we only consider distinct numbers present? 
		// Let's re-read carefully: "重複を除いた整数について" -> Regarding unique integers (the set of distinct numbers).
		// Does it mean calculate stats for each number in the set, or just one global stat based on the set?
		// Given output format `count=<個数> sum=<合計>` is singular. It likely means: 
		// 1. Count how many unique integers are there (size of map).
		// 2. Sum up all those unique integers themselves? Or sum of frequencies?
		// Let's look at the example logic again if possible, but none provided for this specific task.
		// Standard interpretation: 
		// "個数" = number of distinct elements found in input (size of map).
		// "合計" = sum of all numbers present? Or sum of counts?
		// Let's assume the most logical mathematical operation on a set S: |S| and Sum(S).
		// However, another interpretation is counting occurrences per unique number. But output has only one count field. 
		// So "count" must be the cardinality of the distinct numbers found.
		// And "sum" could be sum of these distinct numbers OR sum of all input numbers (which equals sum of distinct * frequency).
		// Let's assume: Count = number of unique integers, Sum = sum of those unique integers? 
		// Or maybe Sum = total count of items in the list? No, that would just be len(input tokens).
		// Let's go with: Count = Number of distinct values. Sum = Sum of all numbers (including duplicates) OR Sum of distinct values?
		// Actually, looking at similar problems, often "sum" implies summing up the unique items themselves if they are treated as a set. 
		// But let's consider the phrase "重複を除いた整数について". This modifies both count and sum.
		// If I have 1, 2, 3 -> Count=3 (distinct), Sum=6? Or Sum of counts = 3+1+1... no.
		// Let's assume: 
		// Count = Number of unique integers in the input sequence.
		// Sum = The sum of these unique integers.
		// Wait, if I have "1,2,2", distinct are {1, 2}. Count=2. Sum could be 3 (1+2) or maybe just count is enough? 
		// Let's try to interpret as: Calculate the number of items and their sum after removing duplicates from the list.
		// Example Input: "1, 2, 2" -> Unique: [1, 2]. Count = 2. Sum = 3.
		
		// Wait, I need to be careful about the loop logic above. 
		// Let's restart the calculation part cleanly below.
	}

	count := len(pairs) // Number of unique integers
	
	var totalSum int64 = 0
	for n := range pairs {
		totalSum += int64(n)
	}
	
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
