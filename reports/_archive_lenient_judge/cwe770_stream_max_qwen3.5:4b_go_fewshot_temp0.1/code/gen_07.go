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
		fmt.Printf("count=0 max=0\n")
		return
	}

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64, but handle empty input carefully. 
								// Actually, if no valid integers are found, max should probably be the first one or handled logically.
								// Let's re-evaluate: If we find at least one integer, that becomes initial max. Otherwise 0? Or undefined behavior is avoided by logic.
								// The problem asks for "count" and "max". If count > 0, max must be valid. 
								// A safe initialization for finding maximum in a stream where the first element sets the baseline:

	maxVal := int64(0) // Placeholder; will be updated on first valid number
	firstValid := false

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
		if !firstValid || n > maxVal {
			maxVal = n
			firstValid = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
