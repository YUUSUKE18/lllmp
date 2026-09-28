package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	var numbers []int

	for _, s := range input.Lines() {
		parts := strings.SplitN(s, ":")
		if len(parts) != 2 {
			continue
		}
		valueStr, _ := strconv.Atoi(parts[0])
		countStr, _ := strconv.Atoi(parts[1])
		if countStr == 0 {
			continue
		}
		for i := 0; i < countStr; i++ {
			numbers = append(numbers, valueStr)
		}
	}

	count := len(numbers)
	sum := 0
	for _, num := range numbers {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
