package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	count := 0
	maxVal := int64(-1e38 - 1) // Initialize with a value lower than min int64 range for logic, but we will handle first element separately to avoid overflow issues if input is empty or all invalid. Actually, better approach: use bool flag or very small number since inputs are within int64.
	// Since values are within 64-bit integer range, initializing maxVal with the minimum possible value + a tiny bit of margin isn't safe due to underflow in logic if we just decrement? 
	// Better: initialize with first valid element.

	hasFirst := false
	
	for _, token := range strings.Fields(sc.Text()) {
		n, err := strconv.ParseInt(token, 10, 64) // Parse as int64 directly
		if err != nil || n < math.MinInt64 { 
			continue 
		}
		
		count++
		if !hasFirst {
			maxVal = n
			hasFirst = true
		} else if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, int64(maxVal)) // Wait, logic error in variable naming above. Let's rewrite cleanly inside the block below without external dependencies like math package to be safe and minimal as per "standard library only" but specifically avoid importing extra if possible? Actually strconv is standard. But wait, I used strings.Fields which needs import of "strings". And ParseInt needs strconv.
	// Re-checking imports needed: bufio, fmt, os, string (package), strconv.

}
