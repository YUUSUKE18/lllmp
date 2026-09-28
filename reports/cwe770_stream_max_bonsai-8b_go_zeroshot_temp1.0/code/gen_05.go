package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	elements := []int{}
	maxVal := 0

	for _, s := range input.Lines() {
		parts := strings.Fields(s)
		for _, part := range parts {
			if num, err := strconv.Atoi(part); err == nil {
				num = int64(num)
				if num > maxVal {
					maxVal = num
				}
				elements = append(elements, num)
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", len(elements), maxVal)
}
