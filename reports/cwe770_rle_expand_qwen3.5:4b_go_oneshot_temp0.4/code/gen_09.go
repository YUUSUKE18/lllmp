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
		fmt.Printf("count=0 sum=0\n")
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

		valStr, ok1 := strconv.ParseInt(strings.TrimSpace(fields[0]), 10, 64)
		countStr, ok2 := strconv.ParseInt(strings.TrimSpace(fields[1]), 10, 64)

		if !ok1 || !ok2 {
			continue
		}

		val := valStr
		cnt := countStr

		if cnt < 0 {
			continue
		}

		count += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
