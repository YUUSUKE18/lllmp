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

	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle negative numbers correctly, or use first element logic. A safer approach for "no elements found" is to track if we have seen any number. Let's adjust max initialization strategy.
	hasValue := false

	for _, s := range strings.Split(sc.Text(), ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 || (len(s) > 1 && !strings.ContainsAny(s, "-")) { // Skip empty or non-numeric if starts with + but has no digits? Actually simpler: try parse.
			continue 
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil || n == int64(0) && s == "0" { // Wait, ParseInt handles errors well. Just check error and ensure it's a valid integer string representation if empty is handled by trim. 
			continue
		}

		count++
		if !hasValue {
			maxVal = n
			hasValue = true
		} else {
			if n > maxVal {
				maxVal = n
			}
		}
	}

	fmt.Printf("count=%d max=%v\n", count, maxVal)
}
