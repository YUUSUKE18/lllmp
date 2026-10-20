package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,2,4,5,5,6,7,8,8,9")
	elements := strings.Fields(input, strings.TrimSpace)
	unique := make(map[int]bool)
	count := 0
	sum := 0

	for _, s := range elements {
		if num, err := strconv.Atoi(s); err == nil {
			if !unique[num] {
				unique[num] = true
				count++
				sum += num
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
