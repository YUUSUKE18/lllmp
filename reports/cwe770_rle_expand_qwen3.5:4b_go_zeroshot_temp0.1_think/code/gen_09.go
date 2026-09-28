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

	// 改行をカンマに置換して、複数行のケースにも対応可能にする
	data = strings.ReplaceAll(string(data), "\n", ",")

	parts := strings.Split(string(data), ",")

	var count int64 = 0
	var sum int64 = 0

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		idx := strings.IndexByte(part, ':')
		if idx == -1 {
			continue
		}

		valStr := part[:idx]
		cntStr := part[idx+1:]

		val, errV := strconv.ParseInt(valStr, 10, 64)
		cnt, errC := strconv.ParseInt(cntStr, 10, 64)

		if errV != nil || errC != nil {
			continue
		}

		sum += val * cnt
		count += cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
