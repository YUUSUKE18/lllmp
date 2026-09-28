package main

import (
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	input, _ := io.ReadAll(stdIn())
	lines := strings.Split(string(input), "\n")
	count := 0
	sum := int64(0)

	for _, line := range lines {
		parts := strings.Fields(line)
		if len(parts) == 0 {
			continue
		}
		valStr := parts[0]
		repeatStr := parts[1]
		val, err := strconv.Atoi(valStr)
		if err != nil {
			continue
		}
		repeat, err := strconv.Atoi(repeatStr)
		if err != nil {
			continue
		}
		if repeat < 0 {
			continue
		}
		count += repeat
		sum += int64(val) * int64(repeat)
	}

	fmt.Fprintf(io.Writer(stdout()), "count=%d sum=%d\n", count, sum)
}

func main() {
	input, _ := io.ReadAll(stdIn())
	lines := strings.Split(string(input), "\n")
	count := 0
	sum := int64(0)

	for _, line := range lines {
		parts := strings.Fields(line)
		if len(parts) == 0 {
			continue
		}
		valStr := parts[0]
		repeatStr := parts[1]
		val, err := strconv.Atoi(valStr)
		if err != nil {
			continue
		}
		repeat, err := strconv.Atoi(repeatStr)
		if err != nil {
			continue
		}
		if repeat < 0 {
			continue
		}
		count += repeat
		sum += int64(val) * int64(repeat)
	}

	fmt.Fprintf(io.Writer(stdout()), "count=%d sum=%d\n", count, sum)
}
