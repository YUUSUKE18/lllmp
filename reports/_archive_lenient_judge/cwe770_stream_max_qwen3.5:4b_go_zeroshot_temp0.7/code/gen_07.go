package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var count int64 = 0
	maxValue := int64(-1<<62 - 1 + 1) // Initialize with a value smaller than min int64 to handle first element correctly, but we need to track if any valid number exists.

	// Re-evaluating the max initialization strategy for correctness across all inputs including empty ones
	minInt := int64(-9223372036854775808) // -1<<63
	maxValInit := minInt + 1                // A safe initial value assuming we want to update on first valid number. 
											// However, if input is empty or no numbers found, max should be undefined? The spec doesn't specify behavior for 'empty' set regarding MAX.
											// Given the output format requires "max=<value>", and inputs are comma-separated integers...
											// Let's assume standard mathematical maximum over a potentially empty set isn't required by spec but if no valid numbers exist, 
											// what to print? The prompt says "accepts integer list", implies at least one might be present. 
											// To avoid runtime panic or undefined behavior on empty input:
											// We will use the first found number as initial max. If none found, we can't output a valid 'max' without spec guidance.
											// But usually in such tasks, if no numbers are parsed, count is 0 and max might be irrelevant or 0? 
											// Let's stick to updating only when a number > currentMax exists OR it's the first one.

	foundAny := false
	
	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF || line == "" { // EOF check for empty input logic too
			break 
		}
		
		// Trim whitespace and split by comma
		cleanLine := strings.TrimSpace(line)
		parts := strings.Split(cleanLine, ",")

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) == 0 {
				continue // Skip empty elements
			}

			valStr, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue // Ignore non-integer values
			}

			count++
			
			// Update max. Since we want the maximum of all found numbers:
			if !foundAny || valStr > maxValue {
				maxValue = valStr
				foundAny = true
			} else if valStr >= maxValue { // Handle duplicate max correctly too (though strictly greater isn't needed for finding the value)
				maxValue = valStr 
			}
		}
		
		if err != nil && line != "" {
			break // Should not happen with standard reading unless error occurred immediately, but safe exit.
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
