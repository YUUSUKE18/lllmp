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

	// Replace commas with spaces to handle comma-separated input
	text := strings.ReplaceAll(string(input), ",", " ")
	tokens := strings.Fields(text)

	uniqueInts := make(map[int64]bool)
	sum := int64(0)

	for _, token := range tokens {
		val, err := strconv.ParseInt(token, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}
		uniqueInts[val] = true
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueInts), sum)
}
