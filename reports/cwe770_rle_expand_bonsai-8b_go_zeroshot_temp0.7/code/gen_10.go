package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	elements := []string{}
	for s := range input.Text {
		if s == ',' {
			continue
		}
		if s == ':' {
			continue
		}
		if s == '-' {
			continue
		}
		elements = append(elements, s)
	}

	count := 0
	sum := 0

	for _, s := range elements {
		parts := strings.Split(s, ":")
		if len(parts) != 2 {
			continue
		}
		valStr, _ := strconv.Atoi(parts[0])
		revStr, _ := strconv.Atoi(parts[1])
		count += revStr
		sum += valStr * revStr
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
