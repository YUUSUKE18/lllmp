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

	var totalCount int64 = 0
	var totalSum int64 = 0

	parts := strings.Split(string(data), ",")

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}

		idx := strings.Index(s, ":")
		if idx == -1 {
			continue
		}

		valStr := strings.TrimSpace(s[:idx])
		cntStr := strings.TrimSpace(s[idx+1:])

		if valStr == "" || cntStr == "" {
			continue
		}

		val, errV := strconv.ParseInt(valStr, 10, 64)
		cnt, errC := strconv.ParseInt(cntStr, 10, 64)

		if errV != nil || errC != nil {
			continue
		}

		if cnt < 0 {
			continue
		}

		totalCount += cnt
		totalSum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
