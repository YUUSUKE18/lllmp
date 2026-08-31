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

		valStr, ok1 := strconv.ParseInt(fields[0], 10, 64)
		countStr, ok2 := strconv.ParseInt(fields[1], 10, 64)

		if !ok1 || !ok2 || valStr < 0 || countStr < 0 {
			continue
		}

		val := valStr
		cnt := countStr

		count += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
