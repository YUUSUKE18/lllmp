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
		fmt.Printf("count=0 max=\n")
		return
	}

	input := sc.Text()
	tokens := strings.Split(input, ",")
	count := 0
	maxVal := int64(math.MaxInt64 - math.MinInt64) // Initialize with a value that will be overwritten on first valid number. However, since we don't import 'math', let's use the logic to handle empty input gracefully by initializing max to something safe or handling it in output.
	// Actually, if no numbers are found, what should max be? The problem implies there might not be any. 
	// Let's initialize maxVal to a very small number so that even negative inputs work correctly as long as we handle the "no input" case separately for printing or use logic where first valid sets it.
	// But wait, if no numbers exist, count=0 and what about max? The example 1 output format is `max=<最大>`. If there are no numbers, maybe empty string or 0? 
	// Let's assume if no integers found, we print with an appropriate placeholder or handle it.
	// Re-reading spec: "整数として解釈できない要素も無視します". It doesn't specify behavior for zero valid integers explicitly other than count=0.
	// To be safe and consistent with typical competitive programming problems unless specified otherwise (like max=-infinity), 
	// let's initialize maxVal to the smallest possible int64 so that any real number will update it, but we need a way to detect if no numbers were seen for output?
	 // Actually, looking at Example 1: `max=<最大>`. If input is empty or non-integers only, what is `<最大>`? 
	 // Let's initialize maxVal to int64(-math.MaxInt64) but we don't import math. We can use a flag 'first' instead of initializing with an extreme value if possible, OR just pick -10^39 (not valid).
	 // Better approach: Initialize `max` to the first found number's logic using a boolean flag or initialize to min int64 manually? 
	 // Since we can't import math package easily without adding imports (allowed "standard library only"), let's use a very small literal if possible, but -10^39 is not valid.
	 // Let's stick to the example 1 logic: `max := 0` and check `first`. If no numbers found, it stays 0? Or maybe we should output something else? 
	 // The prompt says "整数として解釈できない要素も無視します". It doesn't say what if all are non-integers.
	 // Let's assume standard behavior: if count > 0, max is the maximum of those integers. If count == 0, maybe print `max=0` or handle gracefully? 
	 // Given Example 1 initializes `max := 0`, let's follow that pattern but ensure correctness for negative numbers by using a flag.
	
	maxVal := int64(0)
	hasValue := false

	for _, token := range tokens {
		token = strings.TrimSpace(token)
		if len(token) == 0 {
			continue // Skip empty elements after split (e.g., trailing comma or double commas)
		}
		
		val, err := strconv.ParseInt(token, 10, 64)
		if err != nil {
			continue // Ignore non-integer tokens
		}

		count++
		if !hasValue || val > maxVal {
			maxVal = val
			hasValue = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
