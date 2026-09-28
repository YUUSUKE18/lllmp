package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	parts := strings.Split(line, ",")
	count := 0
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

		value, err := strconv.ParseInt(fields[0], 10, 64)
		if err != nil {
			continue
		}

		repeatCount, err := strconv.Atoi(fields[1])
		if err != nil || repeatCount < 0 {
			continue
		}

		count += repeatCount
		sum += value * int64(repeatCount)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
