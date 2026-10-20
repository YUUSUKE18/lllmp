package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,2,4,5,5,6,7,8,9,10,11,11,12,13,14,15,15,16")
	uniqueNumbers := make(map[int]bool)
	sum := 0

	for _, s := range input {
		if num, err := strconv.Atoi(string(s)); err == nil {
			if !uniqueNumbers[num] {
				uniqueNumbers[num] = true
				sum += num
			}
		}
	}

	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
