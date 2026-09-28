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
		valStr, _ := strconv.Atoi(parts[0])
		countStr, _ := strconv.Atoi(parts[1])
		if countStr < 0 {
			continue
		}
		if valStr < 0 {
			continue
		}
		elements = append(elements, fmt.Sprintf("%d", valStr))
	}

	count := 0
	sum := 0
	for _, val := range elements {
		parts := strings.Split(val, ",")
		if len(parts) != 2 {
			continue
		}
		n, _ := strconv.Atoi(parts[0])
		c, _ := strconv.Atoi(parts[1])
		if c < 0 {
			continue
		}
		count += n
		sum += n * c
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
