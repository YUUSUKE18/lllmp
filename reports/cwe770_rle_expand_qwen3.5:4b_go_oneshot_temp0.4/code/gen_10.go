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
		partsStr := strings.TrimSpace(part)
		if len(partsStr) == 0 {
			continue
		}

		items := strings.SplitN(partsStr, ":", 2)
		if len(items) != 2 {
			continue
		}

		valStr, errVal := strconv.ParseInt(strings.TrimSpace(items[0]), 10, 64)
		countStr, errCount := strconv.ParseInt(strings.TrimSpace(items[1]), 10, 64)

		if errVal != nil || errCount != nil {
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
