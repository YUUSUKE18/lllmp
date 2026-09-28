package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.Discard) // 標準入力を読み込むための設定
	input, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	parts := strings.Split(input, ",")
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

		value, err1 := strconv.ParseInt(fields[0], 10, 64)
		repeat, err2 := strconv.ParseInt(fields[1], 10, 64)

		if err1 != nil || err2 != nil {
			continue
		}

		if repeat < 0 {
			continue
		}

		count += int(repeat)
		sum += value * repeat
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
