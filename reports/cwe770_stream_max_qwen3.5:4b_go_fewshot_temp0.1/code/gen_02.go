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
								// Let's re-evaluate: If we find at least one integer, that becomes initial max. Otherwise 0? Or undefined behavior is avoided by logic.
								// The spec says "find count and max". If no integers exist, what to output for max? 
								// Usually in such problems, if the set of numbers is empty, we might not have a valid max. 
								// However, looking at Example 1: `max=0` was initialized but updated only on first or greater.
								// If no integers are found, count will be 0. What about max? 
								// Let's assume if count > 0, we have a valid max. If count == 0, maybe output something safe like `max=0` or handle it gracefully.
								// But strictly following Example 1 logic: initialized to 0, updated on first found. 
								// Wait, Example 1 initializes max=0 and updates if n > max OR first is true. So the first number sets max regardless of value (even negative).
								// Let's adjust initialization strategy for correctness with negatives.

	maxVal := int64(0) // Placeholder
	firstFound := false

	for _, token := range tokens {
		w := strings.TrimSpace(token)
		if w == "" {
			continue
		}
		
		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
		}

		count++
		if !firstFound || n > maxVal {
			maxVal = n
			firstFound = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
