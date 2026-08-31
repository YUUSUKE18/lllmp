package main

import (
	"bufio"
	"fmt"
	"strings"
)

func main() {
	reader := bufio.NewReader(strings.NewReader(""))

	scanner := bufio.NewScanner(reader)
	if !scanner.Scan() {
		return
	}

	input := scanner.Text()

	counts := strings.Split(input, ",")
	var total int64 = 0
	for _, item := range counts {
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

		if valueStr == "" || countStr == "" {
			continue
		}

		val, err := strconv.ParseInt(valueStr, 10, 64)
		if err != nil {
			continue
		}

		count, err := strconv.ParseInt(countStr, 10, 64)
		if err != nil || count < 0 {
			continue
		}

		total += val * int64(count)
	}

	fmt.Printf("count=%d sum=%d\n", total, total)
}
