package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}

	line := sc.Text()
	items := strings.Split(line, ",")

	count := int64(0)
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

		valueStr, countStr := strings.TrimSpace(parts[0]), strings.TrimSpace(parts[1])

		v, err := strconv.ParseInt(valueStr, 10, 64)
		if err != nil {
			continue
		}

		c, err := strconv.ParseInt(countStr, 10, 64)
		if err != nil || c < 0 {
			continue
		}

		count += c
		sum += v * c
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
