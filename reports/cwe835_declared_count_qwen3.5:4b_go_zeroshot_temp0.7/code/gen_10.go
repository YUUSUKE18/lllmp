package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	sum := int64(0)
	count := 0

	if scanner.Scan() {
		n, err := fmt.Sscanf(scanner.Text(), "%d", nil) // Read the count n (unused for logic as per spec)
		if err != nil || n == 0 {
			return
		}
	} else if scanner.Err() != nil {
		os.Exit(1)
	}

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		// Try to parse integer from the line
		var val int64
		if _, err := fmt.Sscanf(line, "%d", &val); err != nil {
			continue // Ignore lines that cannot be parsed as integers
		}

		sum += val
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
