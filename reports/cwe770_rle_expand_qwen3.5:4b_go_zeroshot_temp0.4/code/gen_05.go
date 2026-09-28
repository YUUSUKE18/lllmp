package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	input, err := ioutil.ReadAll(reader)
	if err != nil {
		os.Exit(1)
	}

	var totalElements int64 = 0
	var totalSum int64 = 0

	lines := strings.Split(string(input), "\n")
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}

		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) == 0 {
				continue
			}

			items := strings.SplitN(part, ":", 2)
			if len(items) != 2 {
				continue
			}

			valueStr := strings.TrimSpace(items[0])
			countStr := strings.TrimSpace(items[1])

			if valueStr == "" || countStr == "" {
				continue
			}

			value, errVal := strconv.ParseInt(valueStr, 10, 64)
			if errVal != nil {
				continue
			}

			count, errCount := strconv.ParseInt(countStr, 10, 64)
			if errCount != nil {
				continue
			}

			if count < 0 {
				continue
			}

			totalElements += count
			totalSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalElements, totalSum)
}
