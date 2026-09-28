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
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	parts := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle negative numbers correctly, but since we need strict logic for empty input:
	first := true
	// Re-initialize maxVal properly. Since the problem implies valid integers exist or count=0 if none found.
	// A safe approach is to track the first valid number as initial max.

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		n, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements as per spec (though input is comma-separated integers usually implying valid ones, strict adherence says ignore invalid).
		}

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
