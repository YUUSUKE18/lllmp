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
								// Actually, if no valid integers are found, max should probably be the first one or handled as per spec logic.
								// Let's re-evaluate: If we find at least one integer, that becomes initial max. Otherwise 0? Or min int64?
								// The problem says "values fit in 64bit range". It doesn't specify behavior for no integers found explicitly other than ignoring invalid ones.
								// A safe bet is to initialize with the first valid number or a very small number if we assume at least one exists, 
								// but strictly speaking, if input is just empty/invalid chars, count=0 and max should reflect that state? 
								// Usually in such problems, if no numbers are found, outputting 0 for both might be expected unless specified otherwise.
								// However, looking at the example logic: "max=<最大>". If there's nothing to maximize, what is it?
								// Let's assume if count > 0, max is valid. If count == 0, we can output 0 for max as well or handle gracefully. 
								// Given the examples don't show edge cases of no input/invalid only, let's initialize with a flag to track first element.
	
	first := true
	
	for _, token := range tokens {
		w := strings.TrimSpace(token)
		if w == "" {
			continue // Skip empty elements after trim
		}

		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
