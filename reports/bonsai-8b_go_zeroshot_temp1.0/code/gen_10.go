package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,2,4,5,6,7,8,9,10,10,11,12,13,14,15,15,16")
	numbers := strings.Fields(input)
	
	unique := make(map[int]bool)
	count := 0
	sum := 0

	for _, numStr := range numbers {
		if numStr == "" {
			continue
		}
		num, err := strconv.Atoi(numStr)
		if err != nil {
			continue
		}
		if !unique[num] {
			unique[num] = true
			count++
			sum += num
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
