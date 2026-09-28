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
		parts := strings.TrimSpace(s).split(",")
		for _, part := range parts {
			if num, err := strconv.Atoi(part); err == nil {
				numbers = append(numbers, num)
			}
		}
	}

	count := len(numbers)
	max := numbers[0]
	for _, num := range numbers[1:] {
		if num > max {
			max = num
		}
	}

	fmt.Printf("count=<%d> max=<%d>\n", count, max)
}
