package main

import (
	"fmt"
	"sort"
)

func main() {
	target := readTarget()
	nums := readNumbers()

	count := countPairs(nums, target)

	fmt.Printf("pairs=%d\n", count)
}

func readTarget() int {
	var target int
	fmt.Scan(&target)
	return target
}

func readNumbers() []int {
	nums := make([]int, 0)
	for {
		var num int
		fmt.Scan(&num)
		if num == 0 {
			break
		}
		nums = append(nums, num)
	}
	return nums
}

func countPairs(nums []int, target int) int {
	sort.Ints(nums)

	count := 0
	left, right := 0, len(nums)-1

	for left < right {
		sum := nums[left] + nums[right]
		if sum == target {
			count++
			left++
			right--
		} else if sum < target {
			left++
		} else {
			right--
		}
	}

	return count
}
