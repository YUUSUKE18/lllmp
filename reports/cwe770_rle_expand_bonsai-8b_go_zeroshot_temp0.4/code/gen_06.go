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
		s = strings.TrimSpace(*s)
		if s == "" {
			continue
		}
		parts := strings.Split(s, ":")
		if len(parts) != 2 {
			continue
		}
		val, _ := strconv.Atoi(parts[0])
		count, _ := strconv.Atoi(parts[1])
		if count < 0 {
			continue
		}
		for i := 0; i < count; i++ {
			numbers = append(numbers, val)
		}
	}

	count := len(numbers)
	sum := 0
	for _, num := range numbers {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
