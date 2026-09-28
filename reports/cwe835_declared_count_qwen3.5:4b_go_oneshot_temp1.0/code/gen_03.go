package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines, errCount := 0, 0
	var sum float64 // using float64 for accumulation to avoid overflow before printing if needed, though int is specified. Actually, problem says 64bit integer range, so int is fine. But Go's int can be variable length on platform. Let's use int64 specifically or just int if we assume it fits. The spec says "64bit integer", implies value fits in 64-bit.
	
	var count int
	
	// Read first line for expected count
	lineCount := 0
	counts := make([]int, 1) // to store the expected count from first line if valid? 
	// Wait, spec says: "標準入力の 1 行目に、続く整数の個数が書かれています。" -> The first line contains the number of subsequent integers.
	
	if !sc.Scan() {
		return
	}
	expectedCountStr := sc.Text()
	
	// Parse expected count. If it fails (e.g., empty or invalid), we treat as 0 or ignore? 
	// Spec says "actually exists... inconsistent with line 1 value". It doesn't say what to do if line 1 is not a number. 
	 // Assuming it's always at least one attempt.
	
	// Let's parse the first line integer. If fail, maybe treat expected as 0? Or just ignore parsing error and proceed? 
	 // The spec implies we read that value. If it's not an integer, perhaps we skip or it's malformed input. 
	 // Given constraints, let's assume valid integer for now if possible, but robust code handles non-int by maybe ignoring that line's count?
	 // Actually, better: just parse the first token. If invalid, treat expectedCount as 0? Or maybe the problem guarantees well-formed first line? 
	 // "実際に存在する整数の個数は 1 行目の値と一致しないことがあります" implies line 1 has a value.
	
	expectedCount := -1
	if errVal := sc.Scan(); errVal != nil {
		// Should not happen per spec usually, but handle gracefully
		// If first line is empty or error, maybe count=0? 
		 // But we already scanned once. Let's assume the text was read.
		expectedCount = 0 
	} else {
		text := sc.Text()
		val, errVal := strconv.Atoi(text)
		if errVal != nil {
			// If not an integer, what to do? Maybe treat as 0 expected count? 
			// The spec says "integer number". Let's assume it's valid if it exists.
			// If invalid string, we might still proceed with 0 or undefined behavior? 
			 // To be safe, let's set expectedCount = 0 on failure to avoid crashing logic.
			expectedCount = 0
		} else {
			expectedCount = val
		}
	}

	lines = 1 // first line was read
	
	// Now loop subsequent lines until EOF or max iterations if needed, but "until EOF" is implied by "2行目以降"
	// Wait, input might have many lines. We need to stop when we run out of integer inputs.
	
	var sum64 int64 = 0
	actualCount := 0
	
	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue // Skip empty lines
		}
		
		lines++
		
		val, errVal := strconv.Atoi(text)
		if errVal != nil {
			continue // Ignore non-integer lines
		}
		
		sum64 += int64(val)
		actualCount++
	}
	
	if sc.Err() != nil {
		// Handle errors if any, though spec implies valid input range. 
		// If error occurred while reading, we stop and output what we have.
		// But for this exercise, let's assume we just process what was read.
	}
	
	fmt.Printf("count=%d sum=%d\n", actualCount, sum64)
}
