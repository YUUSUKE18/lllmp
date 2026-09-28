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
	parts := strings.Split(text, ",")
	count := 0
	maxVal := int64(-9223372036854775808) // min int64 as initial value to handle negative numbers correctly if needed, but logic below handles first element separately

	// Actually, let's use a flag for the first valid number found
	first := true
	
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		
		n, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
