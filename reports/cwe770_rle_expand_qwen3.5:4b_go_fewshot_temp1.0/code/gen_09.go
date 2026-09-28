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

	count := int64(0)
	sum := int64(0)

	for _, part := range strings.Split(input, ",") {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		parts := strings.SplitN(part, ":", 2)
		if len(parts) != 2 {
			continue
		}

		var value int64
		var reps int64

		valStr := strings.TrimSpace(parts[0])
		repStr := strings.TrimSpace(parts[1])

		var err error
		if value, err = strconv.ParseInt(valStr, 10, 64); err != nil {
			continue
		}
		if reps, err = strconv.ParseInt(repStr, 10, 64); err != nil {
			continue
		}

		count += reps
		sum += value * reps
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
