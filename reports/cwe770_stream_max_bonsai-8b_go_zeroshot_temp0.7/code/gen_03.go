package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	elements := []int{}
	for _, s := range input.Text() {
		if s == "," {
			continue
		}
		trimmed := strings.TrimSpace(string(s))
		if num, err := strconv.Atoi(trimmed); err == nil {
			if num > 0 && num <= 2^63-1 {
				elements = append(elements, num)
			}
		}
	}

	count := len(elements)
	if count == 0 {
		fmt.Println("count=0 max=0")
	} else {
		max := elements[0]
		for _, num := range elements[1:] {
			if num > max {
				max = num
			}
		}
		fmt.Printf("count=%d max=%d\n", count, max)
	}
}
