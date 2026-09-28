package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		return
	}
	fmt.Sscanf(sc.Text(), "%d", &target)

	var nums []int64
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		var n int64
		fmt.Sscanf(line, "%d", &n)
		nums = append(nums, n)
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
