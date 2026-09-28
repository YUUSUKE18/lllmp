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

	// 1. Read the expected count N from the first line.
	if !scanner.Scan() {
		// No input provided
		fmt.Println("count=0 sum=0")
		return
	}

	// Parse N (the expected count). We ignore errors here as the specification implies
	// we proceed based on what we successfully read.
	expectedCountStr := strings.TrimSpace(scanner.Text())
	expectedCount, err := strconv.ParseInt(expectedCountStr, 10, 64)
	if err != nil {
		// If the first line is not a valid integer, we treat the actual count as 0
		// and stop processing.
		fmt.Println("count=0 sum=0")
		return
	}

	var actualCount int64 = 0
	var sum int64 = 0

	// 2. Read the remaining lines and process integers.
	for scanner.Scan() {
		line := scanner.Text()
		// Ignore empty lines
		if strings.TrimSpace(line) == "" {
			continue
		}

		// Attempt to parse the line as an integer.
		// Since the input format implies integers are separated by lines,
		// we try to parse the whole line.
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers.
			continue
		}

		// Successfully read an integer.
		sum += num
		actualCount++
	}

	// 3. Output the result.
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
