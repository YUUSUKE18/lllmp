package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int64 = 0
	var sum int64 = 0
	lineNum := 0

	for scanner.Scan() {
		lineNum++
		line := scanner.Text()

		// Skip empty lines
		if len(line) == 0 {
			continue
		}

		// Line 1 is the count of expected integers, skip it from summation
		if lineNum == 1 {
			continue
		}

		// Try to parse as integer
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that cannot be interpreted as integers
			continue
		}

		count++
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
