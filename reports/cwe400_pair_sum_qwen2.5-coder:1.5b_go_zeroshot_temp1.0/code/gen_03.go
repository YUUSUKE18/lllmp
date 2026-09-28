package main

import (
	"fmt"
	"math"
)

func main() {
	target := math.Abs(float64(^uint64(0)))
	for {
		line, err := fmt.Scanln()
		if err != nil {
			break
		}
		if len(line) == 0 {
			continue
		}
		nums := make([]int, 0)
		for _, numStr := range strings.Fields(line) {
			num, err := strconv.Atoi(numStr)
			if err != nil {
				continue
			}
			nums = append(nums, num)
		}
		if len(nums) == 0 {
			continue
		}
		count := 0
		for i := 0; i < len(nums); i++ {
			for j := i + 1; j < len(nums); j++ {
				if nums[i]+nums[j] == target {
					count++
				}
			}
		}
		fmt.Printf("pairs=%d\n", count)
	}
}
