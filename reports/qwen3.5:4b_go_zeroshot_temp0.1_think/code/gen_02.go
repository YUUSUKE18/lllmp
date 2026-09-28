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
	seen := make(map[int64]bool)
	sum := int64(0)
	count := 0

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if len(s) == 0 {
			continue
		}
		num, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		if !seen[num] {
			seen[num] = true
			count++
			sum += num
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
