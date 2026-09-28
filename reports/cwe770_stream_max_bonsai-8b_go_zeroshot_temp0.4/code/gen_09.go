package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20")
	elements := []int{}
	for _, s := range input.Lines() {
		parts := strings.Split(s, ",")
		for _, part := range parts {
			trimmed := strings.TrimSpace(part)
			if len(trimmed) == 0 {
				continue
			}
			num, err := strconv.Atoi(trimmed)
			if err == nil {
				elements = append(elements, num)
			}
		}
	}
	count := len(elements)
	max := 0
	for _, num := range elements {
		if num > max {
			max = num
		}
	}
	fmt.Printf("count=%d max=%d\n", count, max)
}
