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
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")

	count := int64(0)
	sum := int64(0)

	for _, part := range parts {
		partsTrimmed := strings.TrimSpace(part)
		if partsTrimmed == "" {
			continue
		}

		fields := strings.Split(partsTrimmed, ":")
		if len(fields) != 2 {
			continue
		}

		value, errValue := strconv.ParseInt(strings.TrimSpace(fields[0]), 10, 64)
		countStr := strings.TrimSpace(fields[1])

		countTimes, errCountTimes := strconv.Atoi(countStr)
		if errValue != nil || errCountTimes != nil {
			continue
		}

		count += int64(countTimes)
		sum += value * int64(countTimes)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
