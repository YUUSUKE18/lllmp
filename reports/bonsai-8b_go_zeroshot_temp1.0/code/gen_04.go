package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,2,4,5,5,6")
	seen := make(map[int]bool)
	count := 0
	sum := 0

	for _, s := range input {
		if s == "" {
			continue
		}
		num, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		if !seen[num] {
			seen[num] = true
			count++
			sum += num
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
