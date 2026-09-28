package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	s := strings.Split(string(input), ",")
	count := 0
	maxVal := int64(0)
	hasValue := false

	for _, part := range s {
		part = strings.TrimSpace(part)
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue
		}
		count++
		if !hasValue || val > maxVal {
			maxVal = val
			hasValue = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
