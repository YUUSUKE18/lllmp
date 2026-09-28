package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	var input string
	data, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}
	input = strings.TrimSpace(string(data))

	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(0)
	hasValue := false

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}
		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		count++
		if !hasValue {
			maxVal = val
			hasValue = true
		} else if val > maxVal {
			maxVal = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
