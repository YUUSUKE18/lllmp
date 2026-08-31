package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.LimitReader(os.Stdin, 1<<20)) // 最大読み込みサイズを制限
	input, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	parts := strings.Split(input, ",")
	count := int64(0)
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		fields := strings.Fields(part)
		if len(fields) != 2 {
			continue
		}

		valueStr, countStr := fields[0], fields[1]
		value, errVal := strconv.ParseInt(valueStr, 10, 64)
		count, errCount := strconv.ParseInt(countStr, 10, 64)

		if errVal != nil || errCount != nil {
			continue
		}

		count += count
		sum += value * count
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
