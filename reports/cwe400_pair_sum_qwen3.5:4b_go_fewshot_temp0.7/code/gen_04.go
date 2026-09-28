package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		val, err := fmt.Sscanf(line, "%d", &target)
		if val != 1 {
			break
		}
		break
	}

	var nums []int64
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		val, err := fmt.Sscanf(line, "%d", &nums[len(nums)])
		if val != 1 {
			break
		}
	}

	count := int64(0)
	n := len(nums)
	for i := 0; i < n; i++ {
		targetVal := target - nums[i]
		for j := i + 1; j < n; j++ {
			if nums[j] == targetVal {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
