package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	elements := []int{}
	for _, s := range input.Split(',') {
		s = strings.TrimSpace(s)
		if num, err := strconv.Atoi(s); err == nil {
			if num > 0 && num <= 1000000000000000000 {
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
