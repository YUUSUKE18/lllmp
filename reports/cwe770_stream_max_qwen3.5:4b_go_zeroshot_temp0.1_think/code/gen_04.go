package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	parts := strings.Split(string(data), ",")
	count := 0
	maxVal := int64(0)

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
		if count == 1 {
			maxVal = val
		} else if val > maxVal {
			maxVal = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
