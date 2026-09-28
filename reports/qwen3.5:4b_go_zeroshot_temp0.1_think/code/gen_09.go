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

	var uniqueNumbers map[int64]bool
	uniqueNumbers = make(map[int64]bool)
	sum := int64(0)

	parts := strings.Split(string(input), ",")
	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}

		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}

		uniqueNumbers[val] = true
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueNumbers), sum)
}
