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

	var count int64 = 0
	var sum int64 = 0

	parts := strings.Split(string(data), ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		idx := strings.Index(part, ":")
		if idx == -1 {
			continue
		}
		valStr := strings.TrimSpace(part[:idx])
		cntStr := strings.TrimSpace(part[idx+1:])

		v, errV := strconv.ParseInt(valStr, 10, 64)
		if errV != nil {
			continue
		}
		c, errC := strconv.ParseInt(cntStr, 10, 64)
		if errC != nil || c < 0 {
			continue
		}

		count += c
		sum += v * c
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
