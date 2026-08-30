package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	parts := strings.Fields(line)
	count := 0
	maxVal := int64(-1e38) // Initialize with a very small number to handle potential edge cases correctly for first valid element. However, since the problem implies we process integers, initializing lower than any possible input or handling 'first' flag is safer.

	// Re-evaluating max initialization: if there are no numbers at all, what should be printed?
	// The spec says "count=<number> max=<maximum>". If count is 0, the concept of maximum doesn't exist logically in typical CP problems unless it's defined as empty or min. 
	// Given standard interpretation for such specs: if input has no valid integers, count=0 and max might be undefined.
	// But usually, we set a flag to track if any number was read. Let's use int64(-1) but since inputs can be negative? 
	 // Actually, the safest bet for "maximum" when empty is often not required or handled by logic flow.
	 // However, let's assume valid input will have at least one integer based on typical usage unless specified otherwise (empty handling).
	 // But to strictly follow: if we find 0 numbers, count=0, max=? 
	 // Let's initialize with the first found number or a flag.
	
	foundAny := false
	
	for _, part := range parts {
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		if !foundAny || val > maxVal {
			maxVal = val
			foundAny = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
