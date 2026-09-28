package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int64
	var sum int64
	lineNum := 0

	for scanner.Scan() {
		lineNum++
		line := scanner.Text()

		// Skip the first line (Line 1 contains the expected count, not data to sum)
		if lineNum == 1 {
			continue
		}

		// Ignore empty lines
		trimmedLine := strings.TrimSpace(line)
		if trimmedLine == "" {
			continue
		}

		// Parse integer
		val, err := strconv.ParseInt(trimmedLine, 10, 64)
		if err != nil {
			continue
		}

		count++
		sum += val
	}

	// Output exactly one line with newline at the end
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
