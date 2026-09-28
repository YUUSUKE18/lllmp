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
		fmt.Println("count=0 max=0")
		return
	}

	line := sc.Text()
	parts := strings.Split(line, ",")
	count := 0
	maxVal := int64(-1 << 62) // Initialize with a value smaller than min(int64) but safe for comparison logic if we handle first element separately or use bool flag. Better approach: initialize max to minimal possible and check validity.

	// Re-initialize correctly based on problem constraints (int64 range is -9e18 to 9e18).
	// We can't easily init with min int64 directly in a way that distinguishes "no value" vs "-min", 
	// so let's use a boolean flag or set maxVal after finding the first valid number.

	foundAny := false
	
	for _, part := range parts {
		part = strings.TrimSpace(part) // Remove leading/trailing whitespace from each element too just in case, though spec says elements are comma-separated integers ignoring empty/whitespace issues globally. 
										// Spec: "空要素・前後の空白は無視し" applies to the whole list parsing usually meaning split by comma and trim per part if needed or filter empty strings after split.
		
		if len(part) == 0 {
			continue // Skip empty elements resulting from consecutive commas or trailing leading/trailing spaces before processing? 
					 // Actually "前後の空白は無視" likely means `strings.Fields` behavior on the whole string or per part trim + skip if result is empty string.
					 // Let's stick to: split by comma, then for each sub-string, remove whitespace and check validity.
		}

		// Strip whitespace from individual parts more robustly
		part = strings.TrimSpace(part)
		
		if len(part) == 0 {
			continue 
		}

		nStr := part
		
		value, err := strconv.ParseInt(nStr, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}
		
		count++
		
		if !foundAny || value > maxVal {
			maxVal = value
			foundAny = true 
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
