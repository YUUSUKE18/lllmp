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
	var content []byte
	content, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	s := string(content)
	parts := strings.Split(s, ",")

	count := 0
	maxVal := math.MinInt64

	for _, part := range parts {
		token := strings.TrimSpace(part)
		if token == "" {
			continue
		}
		val, err := strconv.ParseInt(token, 10, 64)
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
