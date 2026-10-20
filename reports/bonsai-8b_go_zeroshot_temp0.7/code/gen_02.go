package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	var nums []int
	input := strings.NewReader("Enter numbers separated by commas: ")
	for {
		input, _ = input.ReadString('\n')
		if input == "" {
			break
		}
		parts := strings.Split(input, ",")
		for _, part := range parts {
			trimmed := strings.TrimSpace(part)
			if trimmed == "" {
				continue
			}
			n, err := strconv.Atoi(trimmed)
			if err == nil {
				nums = append(nums, n)
			}
		}
	}

	unique := make(map[int]bool)
	for _, num := range nums {
		unique[num] = true
	}

	count := len(unique)
	sum := 0
	for _, num := range unique {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
