package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	// Replace commas with spaces to handle comma-separated input and whitespace
	dataStr := strings.ReplaceAll(string(data), ",", " ")
	tokens := strings.Fields(dataStr)

	uniqueNumbers := make(map[int64]bool)
	sum := int64(0)

	for _, token := range tokens {
		val, err := strconv.ParseInt(token, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}
		uniqueNumbers[val] = true
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueNumbers), sum)
}
