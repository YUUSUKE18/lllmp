package main

import (
	"fmt"
	"io"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	input, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	var totalSum int64 = 0
	var totalCount int64 = 0

	re := regexp.MustCompile(`^\d+:\d+$`)

	parts := strings.Split(string(input), ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		if !re.MatchString(part) {
			continue
		}

		valStr, countStr := strings.SplitN(part, ":", 2)
		val, errV := strconv.ParseInt(valStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue
		}

		totalCount += count
		totalSum += val * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
