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

	inputStr := strings.TrimSpace(string(data))
	parts := strings.Split(inputStr, ",")

	count := 0
	maxVal := math.MinInt64

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
		if val > maxVal {
			maxVal = val
		}
	}

	if count == 0 {
		maxVal = 0
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
