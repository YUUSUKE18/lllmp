package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	var nums []int
	for _, s := range input {
		if s == "" {
			continue
		}
		parts := strings.Split(s, ":")
		if len(parts) != 2 {
			continue
		}
		valStr, _ := strconv.Atoi(parts[0])
		countStr, _ := strconv.Atoi(parts[1])
		if countStr == 0 {
			continue
		}
		for i := 0; i < countStr; i++ {
			nums = append(nums, valStr)
		}
	}

	count := len(nums)
	sum := 0
	for _, num := range nums {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
