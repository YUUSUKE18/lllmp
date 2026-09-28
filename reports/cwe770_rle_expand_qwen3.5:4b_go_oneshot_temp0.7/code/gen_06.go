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
	input := sc.Text()

	var count int64
	var sum int64

	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		kv := strings.SplitN(part, ":", 2)
		if len(kv) != 2 {
			continue
		}

		valStr, countStr := strings.TrimSpace(kv[0]), strings.TrimSpace(kv[1])
		n, err := strconv.ParseInt(valStr, 10, 64)
		if err != nil {
			continue
		}
		m, err := strconv.ParseInt(countStr, 10, 64)
		if err != nil || m < 0 {
			continue
		}

		count += m
		sum += n * m
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
