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
		fmt.Printf("count=0 max=%d\n", 0)
		return
	}

	input := sc.Text()
	count := strings.Count(input, ",") + 1
	maxVal := -9223372036854775808 // int64 minimum value to be safe

	parts := strings.Split(input, ",")
	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}

		numVal, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // skip non-integer elements
		}
		count++
		if numVal > maxVal {
			maxVal = numVal
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
