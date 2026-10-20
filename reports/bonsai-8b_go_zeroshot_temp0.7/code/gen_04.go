package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,5,6,7,8,8,9,10")
	elements := strings.Fields(input, strings.TrimSpace)
	
	count := 0
	sum := 0
	seen := make(map[int]bool)
	
	for _, element := range elements {
		if num, err := strconv.Atoi(element); err == nil {
			if !seen[num] {
				seen[num] = true
				count++
				sum += num
			}
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
