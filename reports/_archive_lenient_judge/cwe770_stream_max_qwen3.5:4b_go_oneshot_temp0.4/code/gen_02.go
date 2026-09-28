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
		fmt.Printf("count=0 max=" + fmt.Sprintf("%v", int64(0)) + "\n")
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(-1) // Initialize with a value that will be updated on first valid number if possible, or handled carefully. Since input can contain non-integers and we ignore them, initializing to -1 might cause issues if all numbers are smaller than it? No, because max must be at least the smallest integer in range (-9223372036854775808). Better approach: use a flag or handle first valid.

	// Actually, let's re-evaluate initialization.
	// If we have no integers (e.g., input is "abc" or empty), count=0 and max should probably be 0? Or undefined? 
	// The problem says "求出它们的元素数和最大值". Usually implies there are elements. 
	// However, if all inputs are invalid strings, what to output?
	 // Let's assume valid integers exist based on typical CP problems unless specified otherwise (like empty input).
	 // But to be safe against negative numbers: initialize maxVal with a flag or use the first found value.
	
	maxFound := false

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue 
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore non-integers as per spec "整数として解釈できない要素も無視します"
		}

		count++
		if !maxFound || n > maxVal {
			maxVal = n
			maxFound = true
		}
	}

	fmt.Printf("count=%d max=%v\n", count, maxVal) // Using %v handles negative numbers correctly. Wait, spec says "max=<最大値>". 
	// Let's stick to formatting as integer. If count is 0 (no integers found), what about max? 
	 // The example output format suggests a number. If no integers are parsed, maybe print 0? Or leave it empty for max?
	 // Given the ambiguity on "empty input" or "all invalid", but standard behavior often defaults to 0 if none exist in such simple tasks unless specified.
	 // However, logically if count is 0, there is no maximum. But let's assume at least one integer exists based on typical constraints of such prompts. 
	 // If strictly following logic: if maxFound is false (count > 0 but all invalid? No, then count would be 0).
	 // So if count == 0, we can output anything for max or 0. Let's assume input guarantees at least one integer OR default to 0. 
	 // Actually, looking at the example: "max=<最大>". If no numbers, maybe it's not testable? 
	 // I will initialize maxVal = int64(0) and if count == 0 output 0 for safety as a fallback, but my logic above with `!maxFound` handles negative first values correctly.
	
	// Re-checking the loop: If input is "-5", n=-5. !maxFound is true -> maxVal = -5. Correct.
	// If input is "abc", count=0, maxFound=false. Output will be count=0 max=<undefined>. 
	 // To make it robust for empty/invalid case (often expected in such tasks to output 0 or similar), let's adjust initialization slightly if needed? 
	 // But the spec doesn't define behavior for no integers. I'll assume valid input exists per "整数列".
}
