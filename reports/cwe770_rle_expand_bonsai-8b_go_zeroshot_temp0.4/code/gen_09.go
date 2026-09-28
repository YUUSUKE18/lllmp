package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	var numbers []int

	for _, s := range input {
		parts := strings.SplitN(s, ":")
		if len(parts) != 2 {
			continue
		}
		value, _ := strconv.Atoi(parts[0])
		count, _ := strconv.Atoi(parts[1])
		for i := 0; i < count; i++ {
			numbers = append(numbers, value)
		}
	}

	count := len(numbers)
	sum := 0
	for _, num := range numbers {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
