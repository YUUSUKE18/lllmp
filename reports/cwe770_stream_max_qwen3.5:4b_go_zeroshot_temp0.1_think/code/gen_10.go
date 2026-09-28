package main

import (
	"fmt"
	"io"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	s := string(data)
	parts := strings.Split(s, ",")

	count := 0
	maxVal := math.MinInt64

	for _, part := range parts {
		trimmed := strings.TrimSpace(part)
		if trimmed == "" {
			continue
		}

		val, err := strconv.ParseInt(trimmed, 10, 64)
		if err != nil {
			continue
		}

		count++
		if val > maxVal {
			maxVal = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
