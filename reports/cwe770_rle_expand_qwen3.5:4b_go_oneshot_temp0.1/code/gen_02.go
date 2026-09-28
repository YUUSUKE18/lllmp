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

		valStr, errVal := strconv.ParseInt(fields[0], 10, 64)
		countStr, errCount := strconv.ParseInt(fields[1], 10, 64)

		if errVal != nil || errCount != nil {
			continue
		}

		val := valStr
		cnt := countStr

		sum += val * cnt
		count += cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
