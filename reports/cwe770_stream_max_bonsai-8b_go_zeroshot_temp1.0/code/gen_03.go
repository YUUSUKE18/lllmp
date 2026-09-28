package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var numbers []int
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")

	for _, s := range input.Lines() {
		if s == "" {
			continue
		}
		parts := strings.Split(s, ",")
		for _, part := range parts {
			if part == "" {
				continue
			}
			num, err := strconv.Atoi(part)
			if err == nil {
				numbers = append(numbers, num)
			}
		}
	}

	count := len(numbers)
	if count == 0 {
		fmt.Println("count=0 max=0")
		return
	}

	max := numbers[0]
	for _, num := range numbers[1:] {
		if num > max {
			max = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}
