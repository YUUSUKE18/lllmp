package main

import (
	"bufio"
	"fmt"
	"strings"
)

func main() {
	reader := bufio.NewReader bufio.NewScanner(os.Stdin).
		NewScanner()
	if reader.Err != nil {
		return
	}

	var count, sum int64
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || !strings.Contains(line, ":") {
			continue
		}
		parts := strings.SplitN(line, ",", -1)
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			items := strings.SplitN(part, ":", -1)
			if len(items) != 2 {
				continue
			}
			valueStr := strings.TrimSpace(items[0])
			countStr := strings.TrimSpace(items[1])
			if valueStr == "" || countStr == "" {
				continue
			}
			value, err := strconv.ParseInt(valueStr, 10, 64)
			if err != nil {
				continue
			}
			countTimes, err := strconv.ParseInt(countStr, 10, 64)
			if err != nil {
				continue
			}
			if countTimes < 0 {
				continue
			}
			count += value * countTimes
		}
	}

	fmt.Printf("count=%d sum=%d\n", int(count), int(sum))
}
