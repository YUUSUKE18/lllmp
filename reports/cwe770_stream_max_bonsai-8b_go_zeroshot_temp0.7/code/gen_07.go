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
		if s == "" {
			continue
		}
		num, err := strconv.Atoi(s)
		if err == nil {
			elements = append(elements, num)
		}
	}

	count := len(elements)
	max := elements[0]
	for _, num := range elements[1:] {
		if num > max {
			max = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}
