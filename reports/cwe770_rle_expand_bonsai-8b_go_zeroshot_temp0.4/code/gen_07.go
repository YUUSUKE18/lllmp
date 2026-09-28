package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	elements := []string{}
	for _, s := range input.Lines() {
		if s == "" {
			continue
		}
		parts := strings.Split(s, ":")
		if len(parts) != 2 {
			continue
		}
		valueStr, countStr := parts
	 value, _ := strconv.Atoi(valueStr)
	 count, _ := strconv.Atoi(countStr)
		if count < 0 {
			continue
		}
		if value < 0 {
			continue
		}
		if count == 0 {
			continue
		}
		elements = append(elements, fmt.Sprintf("%d", value))
	}

	count := 0
	sum := 0
	for _, val := range elements {
		count += 1
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
