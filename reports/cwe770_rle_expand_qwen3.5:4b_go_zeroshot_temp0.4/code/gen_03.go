package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	line = strings.TrimSpace(line)
	if line == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(line, ",")
	count := int64(0)
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		fields := strings.SplitN(part, ":", 2)
		if len(fields) != 2 {
			continue
		}

		valueStr, countStr := fields[0], fields[1]
		value, errVal := strconv.ParseInt(valueStr, 10, 64)
		count, errCount := strconv.ParseInt(countStr, 10, 64)

		if errVal != nil || errCount != nil {
			continue
		}

		if count < 0 {
			continue
		}

		count += int64(count)
		sum += value * count
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
