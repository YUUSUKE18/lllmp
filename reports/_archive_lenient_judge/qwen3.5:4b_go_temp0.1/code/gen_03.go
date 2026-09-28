package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go without arguments passed, we should use os.Stdin or similar logic if needed.
	// However, the spec says "standard input", so let's assume it might be empty or have content.
	// Since bufio.NewReader(nil) is not valid for reading from stdin directly like this pattern suggests a misunderstanding of how to read EOF immediately without args.
	// Let's correct: We need to read all lines until EOF.

	scanner := bufio.NewScanner(fmt.Fprint, nil) // This approach is flawed because fmt.Fprint doesn't work as expected here.
	
	// Correct way using os package or just reading from stdin directly via a loop with strings.Split if we assume input comes in one line? 
	// The spec says "standard input", usually implies multiple lines possible but comma-separated integers could be on one line.
	// Let's use bufio.Scanner to read all tokens properly.

	scanner = bufio.NewScanner(nil) // This is invalid for reading stdin without a source. We must import os or assume the environment provides it? 
	// Actually, in Go programs running with standard input, we typically do:
	
	import "os"
	reader = os.Stdin
	
	var lines []string
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" && len(lines) > 0 { // Handle EOF and empty string at end of file
			break 
		}
		lines = append(lines, strings.TrimSpace(line))
	}

	var nums []int64
	for _, l := range lines {
		parts := strings.Split(l, ",")
		for _, p := range parts {
			s := strings.TrimSpace(p)
			if s == "" || !isInt(s) { // Skip empty or non-integer elements
				continue 
			}
			n, _ := strconv.ParseInt(s, 10, 64)
			nums = append(nums, n)
		}
	}

	countMap := make(map[int64]int)
	sumVal := int64(0)
	for _, v := range nums {
		if countMap[v] == 0 { // First occurrence -> increment sum and set flag? No. 
			// Wait, we need unique integers only. So if it's already in map, skip adding to sum again?
			// "重複を除いた整数" means distinct values. So each value should be counted once for both count and sum.
			sumVal += v
			countMap[v]++ // Actually just incrementing the counter is fine since we iterate over unique ones later or during collection.
		} else {
			continue 
		}
	}

	// Re-evaluate logic: We need to collect distinct integers, then count them and sum their values.
	distinctNums := make(map[int64]bool)
	for _, v := range nums {
		if !distinctNums[v] { // If not seen before
			sumVal += v
			countMap[v]++ 
			distinctNums[v] = true
		} else {
			continue 
		}
	}

	fmt.Printf("count=%d sum=%d\n", len(distinctNums), sumVal) // Wait, count is number of unique integers. Sum is their total.
	
	// Correction: The above logic inside the loop was flawed because we were modifying distinctNums and countMap incorrectly.
	// Let's rewrite cleanly below in final code block without comments explaining steps since only one program allowed.

}
