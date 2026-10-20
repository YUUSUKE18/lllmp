package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,5,6,7,8,9,9,10")
	uniqueNumbers := make(map[int]bool)
	sum := 0

	for _, s := range input {
		if numStr, err := s.Trim(); err != nil {
			continue
		}
		if num, err := strconv.Atoi(numStr); err != nil {
			continue
		}
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			sum += num
		}
	}

	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
