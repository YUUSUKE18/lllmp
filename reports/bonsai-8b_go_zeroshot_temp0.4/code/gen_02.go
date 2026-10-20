package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,2,4,5,6,5,7,8,9,9,10")
	uniqueNumbers := make(map[int]bool)
	sum := 0
	count := 0

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
			count++
		}
	}

	fmt.Println("count=" + fmt.Sprintf("%d", count) + " sum=" + fmt.Sprintf("%d", sum))
}
