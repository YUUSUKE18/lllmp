package main

import (
	"fmt"
	"io"
	"os"
	"regexp"
	"strconv"
)

func main() {
	input, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	var totalCount int64 = 0
	var totalSum int64 = 0

	// Regex to match value:count format. 
	// Value can be signed integer, count must be non-negative integer.
	re := regexp.MustCompile(`([-+]?[0-9]+):([0-9]+)`)

	matches := re.FindAllStringSubmatch(string(input), -1)

	for _, match := range matches {
		if len(match) < 2 {
			continue
		}

		valStr := match[1]
		cntStr := match[2]

		val, errV := strconv.ParseInt(valStr, 10, 64)
		cnt, errC := strconv.ParseInt(cntStr, 10, 64)

		if errV != nil || errC != nil {
			continue
		}

		totalCount += cnt
		totalSum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
