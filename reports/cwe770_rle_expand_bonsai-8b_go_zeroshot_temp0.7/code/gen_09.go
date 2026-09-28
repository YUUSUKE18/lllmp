package main

import (
	"fmt"
	"strings"
	"strconv"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	var values []int
	var counts []int

	for _, s := range input {
		parts := strings.SplitN(s, ":")
		if len(parts) != 2 {
			continue
		}
		valStr, _ := strconv.Atoi(parts[0])
		countStr, _ := strconv.Atoi(parts[1])
		if countStr == 0 {
			continue
		}
		values = append(values, valStr)
		counts = append(counts, countStr)
	}

	count := 0
	sum := 0

	for i := 0; i < len(values); i++ {
		count += counts[i]
		sum += values[i] * counts[i]
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
