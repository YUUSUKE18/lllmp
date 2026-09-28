package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// 输入 from stdin
	input := strings.NewReader(os.Stdin)
	// Read the entire input
	inputStr := input.ReadAll()

	// Split the input by commas and process each element
	var elements []string
	for _, s := range inputStr {
		if s == "," {
			elements = append(elements, "")
		} else {
			elements = append(elements, string(s))
		}
	}

	// Filter out empty elements and convert to integers
	var validNumbers []int
	for _, s := range elements {
		if s == "" {
			continue
		}
		if num, err := strconv.Atoi(s); err == nil {
			validNumbers = append(validNumbers, num)
		}
	}

	// Count and find max
	count := len(validNumbers)
	max := validNumbers[0]
	for _, num := range validNumbers[1:] {
		if num > max {
			max = num
		}
	}

	// Output in the required format
	fmt.Printf("count=%d max=%d\n", count, max)
}
