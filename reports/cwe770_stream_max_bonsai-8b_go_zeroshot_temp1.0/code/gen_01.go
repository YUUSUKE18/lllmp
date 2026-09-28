package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	var nums []int
	for _, s := range input.Text() {
		if s == "," {
			continue
		}
		trimmed := strings.TrimSpace(s)
		if num, err := strconv.Atoi(trimmed); err == nil {
			nums = append(nums, num)
		}
	}

	count := len(nums)
	if count == 0 {
		fmt.Println("count=0 max=0")
		return
	}

	max := nums[0]
	for _, num := range nums[1:] {
		if num > max {
			max = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}
