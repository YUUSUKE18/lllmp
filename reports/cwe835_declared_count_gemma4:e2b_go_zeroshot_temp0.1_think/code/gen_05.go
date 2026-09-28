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

	// We read N, but we don't strictly need to use it for filtering, 
	// only for context. We must consume the line.
	// N, err := strconv.Atoi(scanner.Text())
	// if err != nil {
	// 	// Handle error if the first line isn't an integer, though specification implies it is.
	// 	fmt.Println("count=0 sum=0")
	// 	return
	// }

	var sum int64 = 0
	var count int = 0

	// 2. Read the remaining lines and process the integers.
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
