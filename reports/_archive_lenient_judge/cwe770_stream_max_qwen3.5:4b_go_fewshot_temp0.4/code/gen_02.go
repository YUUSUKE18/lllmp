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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle negative numbers correctly, but we need to track if any number was found. A safer approach is using a boolean flag or initializing max to the smallest possible integer and handling the first element separately.

	// Re-initialize logic for robustness
	count = 0
	maxVal := -1 // Placeholder; will be set on first valid int
	
	foundAny := false

	for _, token := range tokens {
		tokensStr := strings.TrimSpace(token)
		if len(tokensStr) == 0 {
			continue
		}

		n, err := strconv.ParseInt(tokensStr, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		foundAny = true
		
		if maxVal == -1 || n > maxVal {
			maxVal = n
		}
	}

	if !foundAny {
		fmt.Printf("count=0 max=\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	}
}
