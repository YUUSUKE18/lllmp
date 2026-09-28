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
	tokens := strings.Split(text, ",")
	maxVal := int64(-9223372036854775808) // min int64 to ensure first valid update works correctly if we handle empty properly. Actually better: use a flag or very small number. Let's re-evaluate logic for safety with negative numbers.
	count := 0

	// Re-reading the loop logic from example but adapted for comma split and count tracking
	maxVal = int64(-9223372036854775808) // Initialize to min possible value so any valid integer updates it. 
	first := true 

	for _, f := range tokens {
		f = strings.TrimSpace(f)
		if len(f) == 0 || f[0] != '-' && (f[len(f)-1] < '0' || f[len(f)-1] > '9') { // Simple check for non-numeric start or end, but strconv handles errors better. Let's stick to try-catch style logic similar to example if possible, though Go doesn't have explicit continue on parse error in range easily without checking err first.
			// The previous approach checked `if n != 0` implicitly by using a flag for max update? No, the example used `first || n > max`. 
			// If input is empty or all invalid, count stays 0 and max should be... what? 
		 // Example output format: "max=<最大>". Usually implies if no numbers, maybe handle gracefully.
		 // However, spec says "integers". Let's assume valid integers exist or default to something logical (like 0 for min int64 logic).
		}

		nStr := strings.TrimSpace(f)
		if nStr == "" {
			continue
		}

		n, err := strconv.ParseInt(nStr, 10, 64)
		if err != nil {
			continue // Ignore invalid elements as per spec
		}

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
