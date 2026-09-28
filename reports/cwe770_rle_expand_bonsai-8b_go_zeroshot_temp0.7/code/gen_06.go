package main

import (
	"fmt"
	"strings"
	"strconv"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	
	elements := []int{}
	sum := 0
	
	for _, s := range input.Lines() {
		parts := strings.SplitN(s, ":")
		if len(parts) != 2 {
			continue
		}
		valStr, _ := parts[0]
		countStr, _ := parts[1]
		
		val, _ := strconv.Atoi(valStr)
		count, _ := strconv.Atoi(countStr)
		
		if count < 0 {
			continue
		}
		
		for _ := range count {
			elements = append(elements, val)
			sum += val
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", len(elements), sum)
}
