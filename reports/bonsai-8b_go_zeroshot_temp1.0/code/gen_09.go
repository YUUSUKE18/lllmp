package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,2,4,5,5,6,7,8,9,10,11,11,12,13,13,14,15")
	elements := []string{}
	for _, s := range input {
		if s == "" {
			continue
		}
		if num, err := strconv.Atoi(s); err == nil {
			elements = append(elements, num)
		}
	}

	seen := make(map[int]bool)
	count := 0
	sum := 0

	for _, num := range elements {
		if !seen[num] {
			seen[num] = true
			count++
			sum += num
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
