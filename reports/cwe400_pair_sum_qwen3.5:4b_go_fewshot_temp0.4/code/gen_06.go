package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewScanner(os.Stdin)
	target, err := r.Scan()
	if err != nil || target == "" {
		fmt.Printf("pairs=0\n")
		return
	}

	targetVal, err := fmt.Sscanf(string(target), "%d", &targetVal)
	if targetVal != 1 || err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	var nums []int64
	for r.Scan() {
		line := r.Text()
		if line == "" {
			continue
		}
		val, err := fmt.Sscanf(line, "%d", &val)
		if val != 1 || err != nil {
			continue
		}
		nums = append(nums, val)
	}

	count := int64(0)
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == targetVal {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
