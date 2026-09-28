package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	var numbers []int

	for _, s := range input.Lines() {
		if s == "" {
			continue
		}
		parts := strings.Fields(s)
		if len(parts) == 0 {
			continue
		}
		for _, part := range parts {
			if val, err := strconv.Atoi(part); err == nil {
				numbers = append(numbers, val)
			}
		}
	}

	count := len(numbers)
	max := 0
	for _, num := range numbers {
		if num > max {
			max = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}
