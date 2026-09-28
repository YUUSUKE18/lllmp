package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	elements := []string{}
	for _, s := range input.Text {
		if s == ',' {
			elements = append(elements, s)
			continue
		}
		if s == ':' {
			elements = append(elements, s)
			continue
		}
		elements = append(elements, s)
	}

	count := 0
	sum := 0

	for _, element := range elements {
		parts := strings.Split(element, ":")
		if len(parts) != 2 {
			continue
		}
	 value, _ := strconv.Atoi(parts[0])
		quantity, _ := strconv.Atoi(parts[1])
		for _ := range parts[1] {
			count++
			sum += value
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
