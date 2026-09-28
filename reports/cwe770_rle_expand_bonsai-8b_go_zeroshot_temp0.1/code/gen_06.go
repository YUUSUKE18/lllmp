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
		if len(parts) < 2 {
			continue
		}
		valueStr, countStr := parts
	 value, _ := strconv.Atoi(valueStr)
	 count, _ := strconv.Atoi(countStr)
		if count < 0 {
			continue
		}
		if count == 0 {
			continue
		}
		elements = append(elements, fmt.Sprintf("%d", value))
	}

	count := 0
	sum := 0
	for _, e := range elements {
		if len(e) == 0 {
			continue
		}
		parts := strings.Split(e, " ")
		if len(parts) < 2 {
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
