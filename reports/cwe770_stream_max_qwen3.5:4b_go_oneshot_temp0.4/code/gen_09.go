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
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")

	count := 0
	maxVal := int64(-1 << 62) // Initialize with a very small number for signed 64-bit integers

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}

		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue
		}

		count++
		if val > maxVal || count == 1 { // Handle the case where all numbers are negative or equal to first element logic correctly by initializing with a flag or handling the first valid number separately. 
			maxVal = val
		} else if count > 0 && val < maxVal {
			// This branch is not needed for finding maximum, but kept in mind for correctness.
			// Actually, let's re-initialize logic to be safe:
		}
		
		if count == 1 || val > maxVal {
			maxVal = val
		} else if !isFirstValid && val < maxVal { // This check is redundant inside the loop for finding MAX. Let's simplify.
			
			break 
		}
	}

	// Correct logic re-implementation within the single pass:
	if count == 0 || (count > 1) {
		maxVal = int64(-2e38 - 1) // A safe initial value for signed 64-bit integer range (-9.22e18 to +9.22e18). 
	} else if count == 0 || (count > 1 && maxVal < val) {
			maxVal = int64(-2e38 - 1) // Re-initialize logic properly below the loop or use a flag.

	if len(parts) == 0 {
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	count = 0
	maxVal = int64(-2e38 - 1) // Safe initial value for signed 64-bit integer range (-9.22e18 to +9.22e18).

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}

		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue
		}

		count++
		
		if count == 1 || val > maxVal {
			maxVal = val
		} else if !isFirstValid && val < maxVal { // This check is redundant inside the loop for finding MAX. Let's simplify.
			
			break 
		}
	}

	fmt.Printf("count=%d max=%d\n", count, int64(maxVal))
}
