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
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}

	text := sc.Text()
	count := 0
	maxVal := int64(-9223372036854775808 - 1) // Initialize with a value smaller than min int64 to handle negatives correctly, or use first element logic. Since we need max of empty input as well (usually 0 or undefined), but spec says ignore invalid elements. Let's assume if no valid integers, output count=0 and max=<something>. However, standard convention for "max" on empty set is often -infinity or the problem implies there will be at least one number? Example 1 didn't specify behavior for empty input explicitly other than logic flow. To be safe with negative numbers:
	// A safer approach: initialize max to a very small number that fits in int64 range if we assume valid inputs exist, OR handle first element separately.
	// Given the constraints "values fit within 64-bit integer", initializing to min Int64 is risky for finding true max of negative numbers unless handled carefully.
	// Better: Use a boolean flag 'first'.

	maxValFound := false // Flag to track if we found at least one valid number

	for _, s := range strings.Split(text, ",") {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
        }
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
            continue 
        }

		count++
		if !maxValFound {
			maxVal = n
			maxValFound = true
        } else if n > maxVal {
			maxVal = n
        }
    }

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
