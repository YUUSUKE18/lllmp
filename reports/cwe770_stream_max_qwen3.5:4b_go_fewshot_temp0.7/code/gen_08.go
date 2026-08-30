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
	sc.Scan()
	parts := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than any possible valid integer to ensure first element is picked as max, or handle empty case. However, since we need to initialize properly for the first non-empty element:
								// A safer approach: use a flag or very small number if guaranteed range fits signed64. 
								// Signed 64-bit min is -9223372036854775808. Let's set to that minus something safe, but logic below uses first element assignment.
	count = 0
	maxVal := int64(0) // Placeholder

	// Use a flag for the first valid number found
	firstValid := false
	
	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		if !firstValid || n > maxVal {
			maxVal = n
			firstValid = true
		}
	}
	
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
