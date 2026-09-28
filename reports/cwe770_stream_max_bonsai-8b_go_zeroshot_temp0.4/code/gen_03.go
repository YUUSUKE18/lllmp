package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	var numbers []int

	for _, s := range input {
		if s == "" {
			continue
		}
		parts := strings.FieldsN(s, ",")
		if len(parts) != 2 {
			continue
		}
		valStr := parts[1]
		if valStr == "" {
			continue
		}
		val, err := strconv.Atoi(valStr)
		if err != nil {
			continue
		}
		numbers = append(numbers, val)
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
