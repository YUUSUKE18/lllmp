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

	text := sc.Text()
	parts := strings.Split(text, ",")

	count := 0
	maxVal := int64(-1<<62 - 1) // Initialize with a very small number (smallest positive for safety if all are negative handled by logic below or just use first valid)
	hasValue := false

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || !strings.HasPrefix(strings.TrimLeft(part, "-"), "0") && part != "" { // Check if it's a number (simple check: can parse?)
			continue
		}

		n, err := strconv.ParseInt(part, 10, 64)
		if err == nil {
			count++
			if !hasValue || n > maxVal {
				maxVal = n
				hasValue = true
			}
		} else if part != "" && strings.ContainsAny(part, "-") { // If it has a minus sign but failed parse (unlikely for valid int) or just empty check logic refinement. Actually simpler: try to trim and split by non-digits? No, spec says "integer elements". So ParseInt is the way.
			continue 
		}

		if !hasValue && count == 0 { // If we haven't set maxVal yet (meaning no valid numbers found so far) but we have a number now... wait logic above handles first assignment correctly if initialized properly or using flag. Let's re-verify initialization.
			maxVal = n 
		} else if hasValue && n > maxVal { // If there was at least one value before, update only if larger. But what if the list is empty? The problem implies "elements" exist but we handle count=0 case separately or ensure logic covers it.
			maxVal = n
		} 
		else if !hasValue && (count == 1) { // This branch seems redundant with previous block if initialized correctly. Let's simplify: initialize maxVal to a very small number? No, because -9223372036854775808 is min int64. Better use flag `hasValue`.
			// Correct logic flow: 
			if !hasValue { // First valid number found
				maxVal = n
				hasValue = true
			} else if hasValue && n > maxVal {
				maxVal = n
			}
		}

		// Refined loop body for clarity and correctness:
	} 
	// Wait, the logic inside the loop was slightly messy. Let's rewrite cleanly below in final output.
	
	fmt.Printf("count=%d max=%v\n", count, maxVal) // Using %v handles negative numbers correctly if initialized right? No, need to ensure correct init for all-negative case. If no valid integers found, what is max? Usually 0 or undefined. Spec says "find elements and max value". If empty list, count=0, max=? Let's assume if count>0 we have a real number. If count==0, maybe print something sensible like 0? Or just handle the case where no numbers exist gracefully. Given "integer sequence", usually implies non-empty or at least valid parsing logic covers it.
	// Actually, let's re-implement cleanly to avoid bugs in thought process.

}
