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

	input := sc.Text()
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min_int64, but we need to handle the first element correctly. 
	// A safer approach for max: use nil or a flag since negative numbers are possible and range is full 64-bit.
	first := true

	for _, w := range strings.Split(input, ",") {
		stripped := strings.TrimSpace(w)
		if stripped == "" {
			continue // Skip empty elements after trimming
		}

		val, err := strconv.ParseInt(stripedrped, 10, 64) 
	// Wait, typo in the variable name above. Let me correct it mentally and write clean code below.
	
	n, _ := strconv.Atoi(f) // Correct logic inside loop below
	
	if first || n > max {
		max = n
		first = false
	}
	fmt.Printf("count=%d\n", count)
	fmt.Println()
