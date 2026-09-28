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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64, but handle empty input carefully. 
								// Actually, if no valid integers are found, max should probably be the first one or handled as undefined?
								// The spec says "count" and "max". If count is 0, what about max?
								// Let's assume if there are elements but none parseable, we output based on parsed ones. 
								// However, to avoid uninitialized variable error in Go:

	maxVal := int64(0) // Default for empty or all invalid case might be tricky. 
						// But logically, if count > 0, max must exist.
						// Let's use a flag or initialize with min possible and check logic.
						// Better approach: Initialize max to the first valid number found? No, loop is better.
						// If no numbers are parsed, what should be printed for 'max'? 
						// The problem implies there might be integers. Let's assume at least one integer exists if count > 0.
						// To satisfy Go compilation without runtime panic on empty input with valid logic:

	maxVal = int64(-1) // Placeholder, will update in loop or handle separately? 
					  // Actually, standard practice for "find max" when list is potentially all invalid/empty:
					  // If count == 0, we can't really define a meaningful max without context. 
					  // But let's assume the input contains at least one integer if it expects 'max'.
					  // Or simply initialize with min int64 and update only on valid parse.

	// Re-initializing logic for safety:
	maxVal = -10000000000000000000LL // Not in Go, use math.MinInt64? No import allowed except standard libs. 
										// We can just set it to the first valid number found or handle empty case specifically if needed.
										// Let's stick to: initialize with a very small number and update on parse success.

	maxVal = int64(-1) // This is not min int64. Min int64 is -9223372036854775808
						// We can't use math package? "standard library only". Yes, `math` is standard lib. 
						// But to be safe and minimal: just track if we found any number.

	foundAny := false
	
	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
		}

		count++
		if !foundAny || n > maxVal {
			maxVal = n
			foundAny = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
