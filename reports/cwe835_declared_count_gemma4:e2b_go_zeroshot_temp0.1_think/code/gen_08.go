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

	// 1. Read the count N (first line)
	if !scanner.Scan() {
		// No input provided
		fmt.Println("count=0 sum=0")
		return
	}

	// We read N, but we don't strictly need to use it for validation, only for context.
	// We proceed to read the actual numbers.
	// N, err := strconv.Atoi(scanner.Text())
	// if err != nil {
	// 	// Handle error if the first line is not a valid integer, though specification implies it is.
	// 	fmt.Println("count=0 sum=0")
	// 	return
	// }

	var sum int64 = 0
	var count int = 0

	// 2. Read subsequent lines and parse integers
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// Ignore empty lines
			continue
		}

		// Attempt to parse the line as an integer
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}

		// Successfully read an integer
		sum += num
		count++
	}

	// 3. Output the result
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
