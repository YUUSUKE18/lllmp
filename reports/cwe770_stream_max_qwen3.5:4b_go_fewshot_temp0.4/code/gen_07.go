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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 but safe for comparison logic if needed, or handle first element separately. A safer approach is using the math package constant MinInt64 directly if available in standard lib without imports (which it isn't), so we can use a very small number or boolean flag.
	count := 0

	// Read all input as one line to match example style of reading stdin text, 
	// though problem says "standard input", examples show single read often covering the content provided.
	sc.Scan()
	input := sc.Text()

	parts := strings.Split(input, ",")
	maxVal = -1 // Placeholder for first element logic

	for _, part := range parts {
		w := strings.TrimSpace(part)
		if w == "" {
			continue
		}

		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
		}

		count++
		if maxVal == -1 || n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
