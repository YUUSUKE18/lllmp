package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,2,4,5,5,6,7,8,9,10,11,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30")
	elements := strings.Fields(input)
	
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
