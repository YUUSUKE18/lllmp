package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,5,6,7,7,8,9,9,10")
	numbers := make([]int, 0)

	for _, s := range input {
		if s == "" {
			continue
		}
		trimmed := strings.TrimSpace(s)
		if !trimmed {
			continue
		}
		n, err := strconv.Atoi(trimmed)
		if err == nil {
			numbers = append(numbers, n)
		}
	}

	unique := make(map[int]bool)
	for _, num := range numbers {
		unique[num] = true
	}

	count := len(unique)
	sum := 0
	for _, num := range unique {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
