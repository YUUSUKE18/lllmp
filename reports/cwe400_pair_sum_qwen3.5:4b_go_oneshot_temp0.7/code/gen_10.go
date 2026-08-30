package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		return
	}
	s, _ := sc.Text().FindInt(0, 64) // This is incorrect, need to parse int64 properly
	// Let's fix the parsing logic above. The scanner text needs to be parsed as int64.
	
	var targetVal int64
	if sc.Scan() {
		str := sc.Text()
		// Skip empty lines if any occur at the start (though spec says 1st line is target)
		// But we should handle potential empty lines before target just in case, 
		// however spec says "標準入力の 1 行目に目標値が与えられます" so likely no empty lines before.
		// Let's assume strict adherence: 1st non-empty line is target? Or literally 1st line?
		// Re-reading spec: "標準入力の 1 行目に目標値が与えられます" -> Line 1 contains target.
		// But to be robust against whitespace, let's parse the first token/line carefully.
		// Actually, simplest is to read all lines and process.
	}

	// Let's rewrite reading logic to be more robust: read all lines into a slice or process on fly.
	// We need to find pairs summing to target.
	
	var n int64 // count of numbers
	numbers := make([]int64, 0)
	
	// Re-implementing the scanner loop properly
	sc = bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}
	targetVal, _ = strconv.ParseInt(sc.Text(), 10, 64)
	// Wait, I need to import strconv. Let's add it.
	
	// Correct approach:
	// 1. Read line 1 -> target
	// 2. Read subsequent lines -> integers
	// Use a single pass or store numbers? N isn't specified but values fit in 64-bit.
	// Assuming O(N^2) is too slow if N is large, but spec doesn't give N constraints. 
	// Standard "Two Sum" problem usually implies O(N log N) with hash map. 
	// However, input format says "2 行目以降には整数が 1 行に 1 個ずつ並びます".
	// If we read line by line, we can store seen numbers in a map.
	
	imported strconv := "strconv" // Placeholder for actual import
	
	// Let's write the full code now with imports correct.
}
