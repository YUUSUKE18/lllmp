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
	text := sc.Text()
	items := strings.Split(text, ",")
	count := 0
	sum := int64(0)

	for _, item := range items {
		item = strings.TrimSpace(item)
		if item == "" {
			continue
		}
		parts := strings.SplitN(item, ":", 2)
		if len(parts) != 2 {
			continue
		}
		valStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])

		val, errVal := strconv.Atoi(valStr)
		if errVal != nil {
			continue
		}

		countNum, errCount := strconv.ParseInt(countStr, 10, 64)
		if errCount != nil {
			continue
		}

		count += int(countNum)
		sum += int64(val) * countNum
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
