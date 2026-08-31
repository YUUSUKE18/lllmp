package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	countStr := input
	var count int
	fmt.Sscanf(countStr, "%d", &count)

	sum := int64(0)
	lineCount := 1

	for lineCount < len(input) { // This logic is flawed for multi-line input in a single read
		// Correct approach: Read all lines properly
		break
	}

	// Re-implementing the reading loop correctly
	scanner := bufio.NewScanner(reader)
	
	// We need to handle the first line separately as it contains the count
	// But the spec says "1 行目に、続く整数の個数が書かれています"
	// And "2 行目以降に整数が 1 行に 1 個ずつ並びます"
	
	// Let's restart the logic cleanly.
	// Read first line for count
	countLine, _ := reader.ReadString('\n')
	fmt.Sscanf(countLine, "%d", &count)

	sum = int64(0)
	actualCount := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		// Skip empty lines
		if line == "" || line == "\n" {
			continue
		}
		
		// Parse integer
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// Ignore lines that are not valid integers
			continue
		}
		
		sum += val
		actualCount++
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
