package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	var nums []int
	for _, s := range input.Lines() {
		if s == "" {
			continue
		}
		parts := strings.Fields(s)
		if len(parts) == 0 {
			continue
		}
		for _, part := range parts {
			num, err := strconv.Atoi(part)
			if err == nil && num >= -1 << 63 && num <= 1 << 63 {
				nums = append(nums, num)
			}
		}
		if len(nums) == 0 {
			fmt.Println("count=0 max=0")
			return
		}
		count := len(nums)
		max := nums[0]
		for _, num := range nums[1:] {
			if num > max {
				max = num
			}
		}
		fmt.Printf("count=%d max=%d\n", count, max)
	}
}
