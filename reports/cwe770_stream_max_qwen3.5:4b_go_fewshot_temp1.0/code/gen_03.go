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
		fmt.Printf("count=0 max=\n")
		return
	}
	input := sc.Text()
	tokens := strings.Split(input, ",")
	var count int64 = 0
	maxVal := int64(-9223372036854775808) // INT64_MIN

	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}
		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil || val < -9223372036854775808 || val > 9223372036854775807 {
			continue // Invalid integer or out of range
		}
		count++
		if count == int64(1) || val > maxVal {
			maxVal = val
		}
	}

	if len(tokens) == 0 && (count == 0) {
		fmt.Printf("count=0 max=\n")
	} else if maxVal != -9223372036854775807 { // Not the initial min value set to avoid false positive for missing data
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	} else {
		fmt.Printf("count=0 max=\n")
	}
}
