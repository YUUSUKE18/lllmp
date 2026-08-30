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
	maxVal := int64(-9223372036854775808) // min int64 as initial value to handle negative numbers correctly if no valid number found

	// Check for empty input or only whitespace/invalid parts logic via loop
	validFound := false
	
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		
		n, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		validFound = true
		
		if n > maxVal || !validFound {
			maxVal = n
		}
	}

	if count == 0 && validFound == false {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10)) // Fallback for empty/invalid input as per common sense or specific requirement interpretation. Given "max=<最大>", usually implies existence. If strictly following logic: if no numbers found, what is the max? The example output format suggests a value exists. Let's assume at least one valid integer will be provided based on typical problem constraints unless specified otherwise. However, to be safe against empty input resulting in undefined behavior for 'max', initializing with min int64 and checking count > 0 before printing might be safer, but the prompt implies we calculate max of received numbers. If no numbers are found after filtering, usually it's an edge case not covered by "integer sequence". Let's assume valid output requires at least one number or handle empty set as 0? The example shows `max=<val>`. I will initialize maxVal to a very small number and if count is 0, print 0.
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10)) 
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	}
	
	if err := sc.Err(); err != nil {
		fmt.Println("error:", err.Error()) // Should not happen with standard input in this context usually
	}
}
