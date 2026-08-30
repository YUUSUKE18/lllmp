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

	fields := strings.Fields(sc.Text())
	count := 0
	maxVal := int64(-1<<62 - 1) // Initialize with minimum possible value for safe comparison on first valid element, or use a flag. A safer approach is to track if we've seen any number yet.
	hasNumber := false

	for _, f := range fields {
		n, err := strconv.ParseInt(f, 0, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}
		count++
		if !hasNumber || n > maxVal {
			maxVal = n
			hasNumber = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
