package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,5,6,7,7,8")
	var uniqueNumbers []int
	seen := make(map[int]bool)

	for _, s := range input {
		if numStr, err := s Trim(); err != nil {
			continue
		}
		if num, err := strconv.Atoi(numStr); err != nil {
			continue
		}
		if !seen[num] {
			seen[num] = true
			uniqueNumbers = append(uniqueNumbers, num)
		}
	}

	count := len(uniqueNumbers)
	sum := 0
	for _, num := range uniqueNumbers {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
