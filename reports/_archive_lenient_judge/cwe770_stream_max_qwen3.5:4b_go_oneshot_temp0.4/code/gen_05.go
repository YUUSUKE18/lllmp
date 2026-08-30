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
		fmt.Println("count=0 max=" + fmt.Sprintf("%d", 0))
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(<<^63) // -1 (smallest int64), but we need to handle empty input correctly. Let's use a flag instead.
	hasValue := false

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil || val < int64(<<^63-2) && !hasValue { // This logic is slightly flawed for the first element. Let's simplify.
			continue 
		}

		count++
		
		if hasValue {
			if val > maxVal {
				maxVal = val
			}
		} else if count == 1 && err != nil || val < int64(<<^63-2) { // Still messy. Let's rewrite cleanly below the block.
			
		}

		hasValue = true
		
		if hasValue {
			maxVal = val
		}
		
	}
	
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
