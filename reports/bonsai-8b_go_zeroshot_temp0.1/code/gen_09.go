package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,5,6,7,8,8,9")
	uniqueNumbers := make(map[int]bool)
	sum := 0
	count := 0

	for _, s := range input {
		if num, err := strconv.Atoi(s); err == nil {
			if !uniqueNumbers[num] {
				uniqueNumbers[num] = true
				sum += num
				count++
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
