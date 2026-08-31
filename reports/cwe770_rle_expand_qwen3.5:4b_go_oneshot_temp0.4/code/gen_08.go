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
	if !sc.Scan() {
		return
	}

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

		valStr, err1 := strconv.Atoi(strings.TrimSpace(fields[0]))
		countStr, err2 := strconv.ParseInt(strings.TrimSpace(fields[1]), 10, 64)

		if err1 != nil || err2 != nil {
			continue
		}

		val := int64(valStr)
		multiplier := countStr

		count += multiplier
		sum += val * multiplier
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
