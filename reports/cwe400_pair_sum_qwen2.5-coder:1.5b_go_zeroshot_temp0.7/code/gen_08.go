package main

import (
	"fmt"
	"sort"
)

func main() {
	var target int64
	fmt.Scan(&target)

	var pairs int64
	var numCount int64
	nums := make([]int64, 0)

	for {
		line, err := fmt.Scanln()
		if err != nil || line == "" {
			break
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		nums = append(nums, num)
		numCount++
	}

	sort.Ints(nums)

	for i := 0; i < numCount; i++ {
		for j := i + 1; j < numCount; j++ {
			if nums[i]+nums[j] == target {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}
