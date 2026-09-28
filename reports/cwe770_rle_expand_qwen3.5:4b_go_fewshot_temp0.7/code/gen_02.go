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
	totalCount := 0
	sum := int64(0)
	line := sc.Text()
	parts := strings.Split(line, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		fields := strings.Fields(part)
		if len(fields) < 2 || fields[0] == "" || fields[1] == "" {
			continue
		}
		val, errVal := strconv.ParseInt(fields[0], 10, 64)
		countStr := strings.TrimSpace(fields[1])
		if errVal != nil || countStr == "" {
			continue
		}
		count, errCount := strconv.Atoi(countStr)
		if errCount != nil || count < 0 {
			continue
		}
		totalCount += count
		sum += val * int64(count)
	}
	fmt.Printf("count=%d sum=%d\n", totalCount, sum)
}
