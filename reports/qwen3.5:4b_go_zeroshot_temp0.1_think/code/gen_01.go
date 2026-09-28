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
	uniqueMap := make(map[int64]bool)
	sum := int64(0)
	count := 0

	for _, part := range s {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue
		}

		if !uniqueMap[val] {
			uniqueMap[val] = true
			count++
			sum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
