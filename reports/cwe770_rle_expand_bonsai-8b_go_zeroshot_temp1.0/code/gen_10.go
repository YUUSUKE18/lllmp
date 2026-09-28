package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	var nums []int
	for _, s := range input.Lines() {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		parts := strings.Split(s, ":")
		if len(parts) != 2 {
			continue
		}
		val, _ := strconv.Atoi(parts[0])
		count, _ := strconv.Atoi(parts[1])
		for i := 0; i < count; i++ {
			nums = append(nums, val)
		}
	}
	count := len(nums)
	sum := 0
	for _, num := range nums {
		sum += num
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
