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

	parts := strings.Split(string(input), ",")

	uniqueInts := make(map[int64]bool)
	sum := int64(0)

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}

		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}

		uniqueInts[val] = true
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueInts), sum)
}
