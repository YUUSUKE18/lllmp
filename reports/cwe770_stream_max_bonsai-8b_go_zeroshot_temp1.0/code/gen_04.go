package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader([]string{"123,456,789", "10, 20, 30", "42, 56, 789.123", "  1, 2,  3  "})

	var elements []int
	for _, line := range input.Lines() {
		parts := strings.Split(line, ",")
		for _, part := range parts {
			trimmed := strings.TrimSpace(part)
			if num, err := strconv.Atoi(trimmed); err == nil {
				if num > 0 && num <= 9223372036854775807 {
					elem := int64(num)
					if elem < 0 && elem > -9223372036854775808 {
						continue
					}
					elem = int(elem)
					if elem >= 0 && elem <= 9223372036854775807 {
						elements = append(elements, elem)
					}
				}
			}
		}
		if len(elements) == 0 {
			fmt.Println("count=0 max=0")
		} else {
			count := len(elements)
			max := elements[0]
			for _, elem := range elements {
				if elem > max {
					max = elem
				}
			}
			fmt.Printf("count=%d max=%d\n", count, max)
		}
	}
}
