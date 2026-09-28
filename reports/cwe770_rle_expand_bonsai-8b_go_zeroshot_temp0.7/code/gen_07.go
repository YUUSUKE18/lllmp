package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	elements := map[int]int{}
	for _, s := range input.Lines() {
		parts := strings.SplitN(s, ",", 2)
		if len(parts) < 2 {
			continue
		}
		valueStr, countStr := parts[0], parts[1]
		value, _ := strconv.Atoi(valueStr)
		count, _ := strconv.Atoi(countStr)
		if count <= 0 {
			continue
		}
		elements[value] += count
	}

	count := 0
	sum := 0
	for _, v := range elements {
		count += v
		sum += v * v
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
