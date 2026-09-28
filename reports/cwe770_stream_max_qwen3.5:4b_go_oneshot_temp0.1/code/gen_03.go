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
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}

	text := sc.Text()
	parts := strings.Split(text, ",")
	count := 0
	maxVal := int64(-9223372036854775808) // min int64 value as initial max (assuming at least one valid number exists or handle empty case separately if needed based on logic below)

	// Re-evaluate: If input is empty after parsing, count should be 0.
	// The problem implies we need to find the maximum of existing numbers. 
	// Initializing with min int64 might cause issues if no valid number exists (max would remain min).
	// Better approach: Initialize maxVal to a flag or handle first element separately.

	hasNumber := false
	
	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
        }
        
        n, err := strconv.ParseInt(s, 10, 64)
        if err != nil {
            continue // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
        }

		count++
		if !hasNumber || n > maxVal {
			maxVal = n
			hasNumber = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
