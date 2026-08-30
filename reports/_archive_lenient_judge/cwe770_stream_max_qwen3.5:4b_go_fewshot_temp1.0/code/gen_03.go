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
		return
	}
	input := sc.Text()
	count := 0
	maxVal := -1
	
	for _, w := range strings.Split(input, ",") {
		w = strings.TrimSpace(w)
		if len(w) == 0 {
			continue
		}
		n, err := strconv.Atoi(w)
		if err != nil || n > math.MaxInt64 || (n < -math.MinInt64 && maxVal >= n){ // Simplified logic below for safety check but standard library only so we rely on runtime guarantee or careful initialization. Since Go's ints are 64-bit by default, and Atoi returns error if overflow happens, just handle the valid case first. Let's re-evaluate: strconv.Atoi handles range correctly returning err if out of bounds. If it succeeds, value is within int64 range.)
			count++
		if maxVal == -1 || n > max { // Check for initialization and comparison
				maxVal = n
				
		// Correct logic flow without relying on math package as per "stdlib only" instruction (though standard library includes runtime checks). The problem statement says stdlib. strconv.Atoi returns error if value is out of range, so we can just check err != nil first to skip invalid ones? Wait, the requirement says 'ignore elements that cannot be interpreted as integers'. If Atoi fails due to overflow, it returns an error and sets a flag or zero with false success depending on version. We must ignore those.
	}

	fmt.Printf("count=%d max=%d\n", count, math.MaxInt64) // Wait I need actual value. Let's restart logic properly without external packages beyond standard.
	
	var n int
	err := strconv.Atoi(w)
	if err == nil && w != "" {
		count++
	}
}

// Corrected full code block for submission:
