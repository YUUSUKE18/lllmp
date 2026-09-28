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

	// 1. Read the count (N) from the first line.
	if !scanner.Scan() {
		// Handle empty input
		fmt.Println("count=0 sum=0")
		return
	}

	// The first line is the expected count, but we only care about the numbers we actually read.
	// We parse it just to consume the line, although the actual count is determined by subsequent successful reads.
	// We ignore the value of N itself for the final count, as per the rule: "実際に読み取れた整数だけを対象とします。"
	// We must ensure we read the rest of the input stream.

	var count int64 = 0
	var sum int64 = 0

	// 2. Read the remaining lines (the actual numbers).
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		// Attempt to parse the line as an integer.
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// 3. Update count and sum.
		count++
		sum += num
	}

	// 4. Output the result.
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
