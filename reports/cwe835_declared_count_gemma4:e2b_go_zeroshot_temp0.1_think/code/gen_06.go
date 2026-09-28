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
		// Handle empty input
		fmt.Println("count=0 sum=0")
		return
	}

	// Parse N (the expected count). We ignore potential errors here, as we rely on the actual read count later.
	expectedCountStr := strings.TrimSpace(scanner.Text())
	expectedCount, err := strconv.Atoi(expectedCountStr)
	if err != nil {
		// If the first line is not a valid integer, we treat the actual count as 0.
		fmt.Println("count=0 sum=0")
		return
	}

	actualCount := 0
	var totalSum int64 = 0

	// 2. Read the remaining lines (the numbers).
	// We iterate through the rest of the input stream.
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // Ignore empty lines
		}

		// Attempt to parse the line as an integer.
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers.
			continue
		}

		// 3. Process the valid integer found.
		totalSum += num
		actualCount++
	}

	// 4. Output the result.
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
