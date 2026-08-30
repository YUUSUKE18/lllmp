package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}

	count := 0
	maxVal := int64(<<^63 >> 1) // Initialize to the minimum possible value for signed 64-bit integer (or use a flag approach if negative numbers are expected and max starts at min_int64 is tricky with comparison logic on first element). Let's refine:

	// Better initialization strategy using a boolean flag or handling the first valid number separately.
	first := true
	
	for _, f := range strings.Fields(sc.Text()) { // Wait, I need to import "strings" here but I didn't in my thought process above? Actually standard library is fine. Let me re-write carefully without missing imports.

	// Corrected Imports and Logic:
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}

	count := 0
	var maxVal int64 = -1 // Placeholder, will be set on first valid number
	
	hasValue := false

	for _, token := range strings.Fields(scanner.Text()) {
		val, err := strconv.ParseInt(token, 10, 64)
		if err != nil || val == "" {
			continue
		}
		
		count++
		if !hasValue {
			maxVal = val
			hasValue = true
		} else if val > maxVal {
			maxVal = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
