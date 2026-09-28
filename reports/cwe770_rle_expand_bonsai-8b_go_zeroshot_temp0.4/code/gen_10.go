package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	
	elements := []int{}
	
	for _, s := range input.String() {
		if s == "," {
			continue
		}
		parts := strings.SplitN(s, ":", 2)
		if len(parts) != 2 {
			continue
		}
		val, _ := strconv.Atoi(parts[0])
		count, _ := strconv.Atoi(parts[1])
		for i := 0; i < count; i++ {
			elements = append(elements, val)
		}
	}
	
	count := len(elements)
	sum := 0
	for _, v := range elements {
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
