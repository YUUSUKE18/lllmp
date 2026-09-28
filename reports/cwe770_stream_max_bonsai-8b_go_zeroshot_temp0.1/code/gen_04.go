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
		val, err := strconv.Atoi(s)
		if err == nil {
			numbers = append(numbers, val)
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
