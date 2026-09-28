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
		parts := strings.SplitN(s, ":", 2)
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
	for _, e := range elements {
		val, _ := strconv.Atoi(e)
		count += val
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
