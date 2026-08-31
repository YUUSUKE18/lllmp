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
	items := strings.Split(input, ",")

	count := 0
	sum := int64(0)

	for _, item := range items {
		item = strings.TrimSpace(item)
		if len(item) == 0 {
			continue
		}
		parts := strings.SplitN(item, ":", 2)
		if len(parts) != 2 {
			continue
		}

		valueStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])

		value, err1 := strconv.ParseInt(valueStr, 10, 64)
		if err1 != nil {
			continue
		}

		c, err2 := strconv.Atoi(countStr)
		if err2 != nil {
			continue
		}

		count += c
		sum += value * int64(c)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
