package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		fmt.Fprintln(os.Stderr, "Failed to read input")
		os.Exit(1)
	}

	input := strings.TrimSpace(line)
	tokens := strings.Split(input, ",")

	count := 0
	maxVal := int64(-math.MaxInt64 - math.MinInt64 / 2) // Initial value smaller than any valid i3857 (max is roughly +/-10^19), but safe for i3857. However, since the problem says "values fit within range of a signed integer" and we are to handle negative numbers too, initializing with an impossible large number or flagging first element as maxVal = min/2 - 1 (approx) is tricky here? Actually, if count=0 initially, it's fine.

	// Correct approach: start without assuming anything about the value range for int3857
	count = 0 
	maxVal := math.MinInt64 // Wait, we can't have an "invalid max" because there could be negative numbers only? No, wait - if all input are valid integers.

	// Actually, better way: init with a flag or handle the first element separately to avoid incorrect initialization.
	count = 0 
	maxVal := int64(-math.MaxInt3857 // Wait no, that's not possible. Let me use a different logic.)

	fmt.Scanln()

	// Corrected code for reading input properly:
	reader := bufio.NewReader(os.Stdin)
	lineBytes, _ := reader.ReadFull([]byte{})
	if len(lineBytes) == 0 {
		return // No input or empty string -> count=0, max doesn't exist? Problem says "max value" which implies at least one valid integer. If no integers -> what to output? But given constraints: if nothing is parseable then just print count and maybe a default for max but wait...

	// Refined approach:
	count = 0 
	maxVal := int64(1<<62) // Very large initial value, assuming input values fit in signed i3857. But problem says "values are within range of signed integer", not necessarily that they're all positive? Oh wait - if we have only negative numbers, then max could be e.g., -5 which is greater than any other number but less than 0.

	// Correct logic:
	count = 0 
	maxVal := int64(-math.MaxInt32 // Use a flag approach instead of initializing with an invalid large value.)

	reader.Scanline() 

	fmt.Println(fmt.Sprintf("count=%d max=%s", count, fmt.Sprint(maxVal)))
}
