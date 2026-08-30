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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64, but handle first element separately to avoid issues if all are invalid or empty initially. Actually, better logic: track max only after finding at least one valid number.

	// Re-evaluate initialization strategy for robustness
	maxVal := int64(0) // Placeholder; we will use a flag or check count > 0 later. 
	hasValue := false
	
	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		if !hasValue || n > maxVal {
			maxVal = n
			hasValue = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
