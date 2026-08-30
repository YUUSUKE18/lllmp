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

	line := sc.Text()
	fields := strings.Fields(line) // automatically handles leading/trailing whitespace and splits by space
	count := len(fields)
	maxVal := int64(-^int64(2)<<63 - 1) // Initialize to min int64 value (or handle empty case separately if needed, but count logic covers it)

	// Re-read the line properly because strings.Fields was consumed from 'line' variable which is fine
	// However, we need to parse numbers. Let's re-parse carefully handling potential errors and non-integer tokens.
	
	count = 0
	maxVal := int64(0) // Default if no valid integers found? The spec says "integers". 
	// If the list has elements but none are valid integers, what is max? Usually min value or undefined.
	// Let's assume we only count and take max of VALID integers.
	
	if count > 0 {
		maxVal = int64(-1) // Placeholder if first element isn't set yet logic below handles this better
	
	for _, f := range fields {
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil {
			continue // ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
		}
		
		count++
		if maxVal == int64(0) || n > maxVal { 
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
