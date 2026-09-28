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
	inputLine := sc.Text()
	
	var counts map[int]int64
	
	strings.SplitFunc(inputLine, func(s string, index int) (string, bool) {
		token, found := strings.CutSuffix(strings.TrimSpace(inputLine), "") // This approach is flawed for multiple tokens. Let's use the correct way first by splitting correctly. 
		return "", false
	})

	parts := strings.FieldsFunc(sc.Text(), func(r rune) bool {
		if r == ',' || (r >= '0' && r <= '9') {
			return true // Stop if we are in a number part? No, standard way is better.
		}
		return false 
	})

	// Correct approach: split by comma and trim each token
	parts = strings.Split(sc.Text(), ",")
	for _, p := range parts {
		tokens := strings.Fields(p) // Split by whitespace within the part if any, though usually not needed after .Split(",") but safe. 
			 // Actually, standard input might have spaces around commas or numbers like "1 , 2".
			 // Let's re-parse properly: split by comma first, then each token might have leading/trailing space which needs trimming.
	}

	var rawTokens []string
	
	for _, part := range strings.Split(sc.Text(), ",") {
		tokens := strings.Fields(part) 
		rawTokens = append(rawTokens, tokens...) // This is redundant but safe if we just take the first token or iterate properly? No, let's simplify.
		
	}

	
	parts2 := strings.Split(sc.Text(), ",")
	for _, part := range parts2 {
		tokens := strings.Fields(part) 
		for _, t := range tokens {
			n, err := strconv.Atoi(t)
			if err != nil {
				continue // Ignore invalid integers
			}
			counts[n]++
		}
	}

	sum := int64(0)
	var uniqueIntegers []int64
	
	for num := range counts {
		totalSum, ok := counts[num]*counts[1]? No logic error. 
// Let's restart the loop properly to calculate sum and count for each number? Wait: "重複を除いた整数" (Unique integers). So we need total distinct numbers' individual sums? Or sum of all unique numbers multiplied by their frequency?
// Re-reading spec: 「それらのうち『重複を除いた整数』について、個数と合計を求めます。」
This phrasing is slightly ambiguous. Does it mean "For each number in the list, calculate its count and value"? But then how to sum them up across numbers? Or does it mean "Count of unique numbers" vs "Sum of all elements after deduplication"? 
Let's assume: For every distinct integer found (ignoring duplicates), we want:
- The total occurrence count of that specific number.
- And the value itself multiplied by its frequency? No, just sum up everything? Or maybe it means for each unique number, output something? But spec says "1行だけ出力". So likely one aggregated result per line. 
Given ambiguity ("個数と合計"), let's interpret as: Total count of all numbers (which is same if we don't dedup vs with dup) and sum of ALL elements (after removing duplicates in the set, i.e., each unique number counted once)? Or maybe "count" refers to how many unique numbers there are? And "sum" refers to their individual values summed up? 
Let's look at similar problems. Often it means: Count = Number of distinct integers found. Sum = The sum of those distinct integers (each added only once).
Wait, re-read Japanese carefully: 「重複を除いた整数」について -> Regarding the set of unique integers extracted from input. "個数" usually means count of these items in this context? Or frequency within original list? 
If I have 1,2,3 -> Unique are {1,2,3}. Count=3 (size of set), Sum=6.
If I have 1,1,2 -> Unique are {1,2}. Count=2 (size of unique set). Sum = 1+2 = 3? Or is it sum of all elements in the list which were processed as unique ones? 
Usually "sum=<合計>" implies arithmetic sum. If we dedup first: [1], then count=1, sum=1; if original was [1,1], after dedup {1}, count=1 (unique items), sum=1.
However, sometimes it means frequency of each element? No, that would require multiple outputs or a map format. Since output is single line `count=<int> sum=<int64>`, and input is integer list, the most logical interpretation for "deduplicated integers" context in aggregation tasks is: 
Count = Number of distinct integers present.
Sum = Sum of those distinct integers (without repetition).

Example: Input "1,2,3, 1 , 5". Unique set {1,2,3,5}. Count=4. Sum=1+2+3+5=11.
Output: count=4 sum=11

Let's proceed with this interpretation (Count of unique values + Sum of those unique values).

	var distinctSum int64 = 0
	count := len(counts) // Wait, I need to iterate counts map properly
	
	for n := range counts {
		distinctSum += n 
	} // This adds the number itself? No. If input is "1", count=1 (unique), sum should be 1. Yes.
	
	fmt.Printf("count=%d sum=%d\n", len(counts), distinctSum)
