package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	elements := make([]int, 0)
	sum := 0

	for _, s := range input.Text() {
		if s == "," {
			continue
		}
		parts := strings.SplitN(s, ":", 2)
		if len(parts) != 2 {
			continue
		}
		val, _ := strconv.Atoi(parts[0])
		count, _ := strconv.Atoi(parts[1])
		if count < 0 {
			continue
		}
		for i := 0; i < count; i++ {
			elements = append(elements, val)
			sum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", len(elements), sum)
}
