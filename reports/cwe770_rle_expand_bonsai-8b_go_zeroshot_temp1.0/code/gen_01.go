package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	elements := make([]int, 0)
	total := 0

	for _, s := range input {
		parts := strings.FieldsN(s, ",")
		for _, part := range parts {
			if len(part) < 5 {
				continue
			}
			valueStr, countStr := strings.SplitN(part, ":")
			value, _ := strconv.Atoi(valueStr)
			count, _ := strconv.Atoi(countStr)
			if count < 0 {
				continue
			}
			for i := 0; i < count; i++ {
				elements = append(elements, value)
			}
			total += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", len(elements), total)
}
