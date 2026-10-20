package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,2,4,5,5,6,7,8,9,9,10")
	uniqueNumbers := make(map[int]bool)
	sum := 0

	for _, s := range input {
		if num, err := strconv.Atoi(s); err == nil {
			if !uniqueNumbers[num] {
				uniqueNumbers[num] = true
				sum += num
			}
		}
	}

	fmt.Println("count=" + fmt.Sprintf("%d", len(uniqueNumbers)) + " sum=" + fmt.Sprintf("%d", sum))
}
