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

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64, but handle empty input carefully. 
								// Actually, if no valid integers are found, max should probably be the first one or handled logically.
								// Let's re-evaluate: If we find at least one integer, it becomes initial max. Otherwise 0? Or undefined behavior is avoided by logic.
								// The problem says "find count and max". If no integers exist, what to output? 
								// Example 1 implies if list exists but all invalid -> max=0 (from example code). But wait, example initializes max=0.
								// Let's follow the pattern: initialize with a very small number or handle first element separately.
								// However, standard practice for "max of empty set" is often undefined or 0 in these simple tasks unless specified. 
								// Looking at Example 1 code provided by user: max starts at 0. If input has no valid ints, it outputs max=0.
								// But if the list contains negative numbers? The example initializes to 0 and updates only if n > max OR first is true.
								// Wait, in Ex 1: `if first || n > max`. So if inputs are -5, -2. 
								// Iteration 1 (-5): first=true -> max=-5, first=false.
								// Iteration 2 (-2): -2 > -5 is true -> max=-2. Correct.
								// If input has no valid ints: loop finishes, prints max=0 (initial value). This seems to be the intended behavior based on Ex 1 logic.

	maxVal = int64(0) // Initialize as per Example 1's implicit default if nothing found? 
						// Actually, let's look closer at Ex 1 code: `max := 0`.
						// If input is empty or all invalid -> prints max=0.
						// But what if valid inputs are negative? The logic `if first || n > max` handles negatives correctly starting from the first element.
						// So initialization to 0 only matters if NO elements pass validation at all.

	for _, token := range tokens {
		w := strings.TrimSpace(token)
		if w == "" {
			continue // Skip empty parts (e.g., "1,,2")
		}
		
		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements like "abc" or "-.5" if not pure int? 
						// ParseInt with base 10 handles signs but stops at decimals unless we specify stopAtDecimalPoint logic manually or just let it fail on ".5".
						// The prompt says "整数として解釈できない要素も無視します". So non-integers are skipped.
			continue
		}

		count++
		
		if count == 1 {
			maxVal = n // First valid integer sets the initial max
		} else if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
