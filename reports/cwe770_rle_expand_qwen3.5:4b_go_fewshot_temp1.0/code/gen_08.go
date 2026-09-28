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
	totalCount := int64(0)
	sum := int64(0)

	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		items := strings.SplitN(part, ":", 2)
		if len(items) != 2 {
			continue
		}

		valStr, ok1 := strings.TrimSpace(items[0])
		countStr, ok2 := strings.TrimSpace(items[1])

		if !ok1 || !ok2 {
			continue
		}

		var val int64
		var count int64

		scanErr := fmt.Sscanf(valStr, "%d", &val)
		if scanErr != nil {
			continue
		}

		scanErr = fmt.Sscanf(countStr, "%d", &count)
		if scanErr != nil || count < 0 {
			continue
		}

		totalCount += count
		sum += val * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, sum)
}
