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
	parts := strings.Split(input, ",")

	var count int64
	var sum int64

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		fields := strings.Fields(part)
		if len(fields) != 2 {
			continue
		}

		val, err1 := strconv.ParseInt(fields[0], 10, 64)
		if err1 != nil {
			continue
		}

		counts, err2 := strconv.ParseInt(fields[1], 10, 64)
		if err2 != nil {
			continue
		}

		count += counts
		sum += val * counts
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
