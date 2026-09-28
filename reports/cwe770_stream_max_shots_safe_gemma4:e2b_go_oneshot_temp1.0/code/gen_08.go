package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile(0) // Read all from stdin
	content := string(input)
	
	// Trim leading/trailing whitespace and split by comma
	parts := strings.FieldsFunc(content, func(r rune) bool {
		return r == ','
	})

	if len(parts) == 0 {
		fmt.Println("count=0 max=0")
		return
	}

	// Process parts to find count and max value
	var count int = 0
	var maxValue int64 = -1 // Initialize with a very small number (since values are non-negative integers)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		
		num, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			// Ignore elements that are not valid integers (though FieldsFunc might handle some spacing issues)
			continue
		}
		
		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// Handle the case where no valid numbers were found, though count should be at least 0.
	if count == 0 {
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
