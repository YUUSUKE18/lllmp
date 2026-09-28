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
		fmt.Println("count=0 max=0")
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(-1 << 62) // Initialize with a value smaller than any valid positive integer or zero if possible. However, to handle potential negative inputs correctly, we should start maxVal to -infinity conceptually, but since Go's strconv.Atoi might return errors for invalid strings and the problem says values fit in int64 range, let's use a safe initialization strategy:

	// Actually, it's safer to initialize max with nil or track if first element is seen.
	first := true
	
	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
        }
		
        n, err := strconv.ParseInt(s, 10, 64)
        if err != nil {
            continue // Ignore elements that cannot be interpreted as integers
        }

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
