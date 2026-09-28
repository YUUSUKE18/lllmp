package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	parts := strings.Split(strings.TrimSpace(line), ",")
	count := 0
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		tokens := strings.SplitN(part, ":", 2)
		if len(tokens) != 2 {
			continue
		}

		valueStr, countStr := tokens[0], tokens[1]
		value, err := strconv.ParseInt(valueStr, 10, 64)
		if err != nil {
			continue
		}

		repeat, err := strconv.ParseInt(countStr, 10, 64)
		if err != nil || repeat < 0 {
			continue
		}

		count += int(repeat)
		sum += value * repeat
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
