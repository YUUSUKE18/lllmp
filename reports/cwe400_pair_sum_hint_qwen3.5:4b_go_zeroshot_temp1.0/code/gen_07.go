package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var target int64
	if err := fmt.Scan(&target); err != nil {
		os.Exit(1)
	}

	count := int64(0)
	nums := []int64{}
	validNums := true

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line, _ := scanner.ReadBytes('\n')
		if len(line) == 0 || string(line) == " " {
			continue
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if validNums && val > target {
			validNums = false
			continue
		}
		nums = append(nums, val)
		if !validNums || len(nums) == 1 {
			continue
		}
		for i := range nums {
			if nums[i] + nums[len(nums)-1-i] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
