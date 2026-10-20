package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,2,4,5,5,6,7,8,9,10,11,11,12,13,14,15,15,16")
	elements := strings.Fields(input, strings.TrimSpace)
	
	unique := make(map[int]bool)
	count := 0
	sum := 0
	
	for _, e := range elements {
		if num, err := strconv.Atoi(e); err == nil {
			if !unique[num] {
				unique[num] = true
				count++
				sum += num
			}
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
