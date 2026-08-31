package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	input := strings.TrimSpace(sc.Text())
	if input == "" {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	var total int64 = 0
	count := 0

	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		keyValIdx := strings.IndexByte(part, ':')
		if keyValIdx == -1 {
			continue
		}

		valueStr := strings.TrimSpace(part[:keyValIdx])
		countStr := strings.TrimSpace(part[keyValIdx+1:])

		val, err := strconv.ParseInt(valueStr, 10, 64)
		if err != nil {
			continue
		}

		cnt, err := strconv.ParseInt(countStr, 10, 64)
		if err != nil || cnt < 0 {
			continue
		}

		total += val * cnt
		count += int(cnt)
	}

	fmt.Printf("count=%d sum=%d\n", count, total)
}
