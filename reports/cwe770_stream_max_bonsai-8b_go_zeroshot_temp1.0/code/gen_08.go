package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var numbers []string
	input := strings.NewReader("Enter numbers separated by commas: ")
	for {
		input, _ = input.ReadLines()
		if len(input) == 0 {
			break
		}
		for _, numStr := range input {
			numStr = strings.TrimSpace(numStr)
			if numStr != "" {
				n, err := strconv.Atoi(numStr)
				if err == nil && n >= -1 <<63 && n <= 1 <<63 {
					numbers = append(numbers, numStr)
				}
			}
		}
	}

	count := len(numbers)
	max := -1 <<63
	for _, numStr := range numbers {
		n, err := strconv.Atoi(numStr)
		if err == nil && n >= -1 <<63 && n <= 1 <<63 {
			if n > max {
				max = n
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}
