package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	var numbers []int

	for _, s := range input.Lines() {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		parts := strings.Split(s, ":")
		if len(parts) != 2 {
			continue
		}
		valueStr, countStr := parts
	 value, _ := strconv.Atoi(valueStr)
	 count, _ := strconv.Atoi(countStr)
		if count < 0 {
			continue
		}
		for i := 0; i < count; i++ {
			numbers = append(numbers, value)
		}
	}

	count := len(numbers)
	sum := 0
	for _, num := range numbers {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
