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

		val, errVal := strconv.ParseInt(fields[0], 10, 64)
		counts, errCounts := strconv.Atoi(fields[1])

		if errVal != nil || errCounts != nil {
			continue
		}

		if counts < 0 {
			continue
		}

		count += int64(counts)
		sum += val * int64(counts)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
