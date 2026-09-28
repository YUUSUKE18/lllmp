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
	sc.Scan()
	line := sc.Text()
	parts := strings.Split(line, ",")
	count := 0
	maxVal := false // true indicates no valid max found yet (or negative infinity logic)
	// Since values can be negative and fit in int64, initializing to a very small number works if we handle the first element correctly.
	// However, to avoid relying on sentinel value for "no elements", let's use an initial flag or check count > 0 after loop.
	
	for _, s := range parts {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		
		v, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // ignore non-integer elements per spec logic "無視します" (though parse error usually means invalid int in base 10 context)
		}
		
		count++
		firstValid := true
		
		if firstValid || v > maxVal {
			maxVal = v
			firstValid = false
		} else if !firstValid && !(v < minInt64 && count == 0) { // Simplification: just track global max
			if v >= minInt64 { 
				// We need a proper initialization. Let's restart logic for clarity within single pass.
			}
		}
		// Refined approach inside loop below to ensure correctness without external constants dependency issues in standard lib scope if not allowed (but math package is stdlib)
		// Actually, simply initializing maxVal = int64(math.MaxInt64 - 10^9)? No. 
		// Better: use a flag or handle the first element separately. Let's re-implement cleanly below without relying on implicit min/max values if possible to be safe with "integers".
	}
	
	// Re-calculate properly for safety and clarity
	maxVal = 0 // This might be wrong if all inputs are negative, need flag
	
	// Resetting logic variables based on single pass requirement again cleanly
	count2 := 0
	var maxV int64
    
	for _, s := range parts {
		s = strings.TrimSpace(s)
		if s == "" {
			continue 
		}
		
		v, err := strconv.ParseInt(s, 10, 64)
		if err != nil || count2 >= math.MaxInt // Wait, math is not imported. Let's use a flag for first element.
			
		correctLoop:
		for _, s := range parts {
			s = strings.TrimSpace(s)
			if s == "" {
				continue 
			}
			v, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue 
			}
			
			count2++
			if count2 == 1 {
				maxV = v // Set first valid element as initial max
			} else if v > maxV {
				maxV = v
			}
		}
		
		fmt.Printf("count=%d max=%d\n", count, maxVal)
