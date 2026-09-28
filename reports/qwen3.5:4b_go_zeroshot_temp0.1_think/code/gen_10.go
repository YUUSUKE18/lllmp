package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	// Replace commas with spaces to handle comma-separated input robustly
	// and treat newlines as whitespace separators.
	inputStr := strings.ReplaceAll(string(input), ",", " ")
	
	// Split by whitespace (handles multiple spaces, tabs, newlines)
	tokens := strings.Fields(inputStr)

	uniqueNumbers := make(map[int]bool)
	sum := int64(0)

	for _, token := range tokens {
		val, err := strconv.Atoi(token)
		if err != nil {
			continue
		}
		uniqueNumbers[val] = true
		sum += int64(val)
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueNumbers), sum)
}
