package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	var elements []int
	var max int

	for _, s := range input {
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
				if len(elements) == 0 || num > max {
					max = num
				}
				elements = append(elements, num)
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", len(elements), max)
}
