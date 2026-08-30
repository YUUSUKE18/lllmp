package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil)
	target, err := strconv.ParseInt(reader.ReadString(), 10, 64)
	if err != nil {
		return
	}
	var nums []int64
	nums = append(nums, target)
	for reader.Scan() {
		line, _ := reader.ReadString()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, val)
	}
	count := 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i] == target - nums[j] {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
