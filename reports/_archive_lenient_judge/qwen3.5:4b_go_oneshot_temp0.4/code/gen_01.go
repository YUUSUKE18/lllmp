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
	for _, s := range strings.FieldsFunc(input, func(r rune) bool { return r == ',' }) {
		s = strings.TrimSpace(s)
		n, err := strconv.Atoi(s)
		if err != nil || n < 0 { // Assuming non-negative integers based on typical "count/sum" problems unless specified otherwise. If negative are allowed, remove the check or adjust logic slightly if needed for specific constraints not mentioned here (e.g., strict positive). Given standard context, usually implies natural numbers or all ints. Let's assume valid int parsing is sufficient without explicit sign restriction beyond being an integer.)
			continue
		}
		pairs[n]++
		sum := 0
		for _, count := range pairs {
			sum += int64(count) * n // Wait, the requirement says "count and sum of unique integers". Usually this means: for each unique number X appearing C times -> output line? Or aggregate ALL counts into one total count and ONE total sum? 
			// Re-reading spec: "重複を除いた整数について、個数と合計を求めます" (For the unique integers, find the count and sum).
			// Output format: `count=<個数> sum=<合計>` -> Singular. This implies TOTAL number of items after deduplication vs SUM OF ALL UNIQUE ITEMS? 
			// Or is it per item? But output says "1行だけ" (only 1 line) with singular keys 'count' and 'sum'.
			// Interpretation A: Total count of unique numbers, Sum of values of those unique numbers.
			// Example Input: `1,2,3` -> Unique: {1,2,3}. Count=3 (how many unique?), Sum=6? 
			// Or does "個数" mean frequency of each? No, output is single line with singular variables.
			// Most logical interpretation for a single-line output `count=X sum=Y`:
			// X = Number of UNIQUE integers found in input.
		 // Y = Sum of those UNIQUE integers (each counted once).
		 // Let's re-read carefully: "重複を除いた整数について、個数と合計を求めます" -> For the set of unique integers, find their count and sum.
		 // This strongly suggests Count = size of unique set, Sum = sum of elements in that set.
		}
	}

	count := len(pairs)
	sumVal := int64(0)
	for n := range pairs {
		sumVal += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", count, sumVal)
}
