package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if sc.Scan() {
		line, _ := sc.Text()
		fmt.Sscanf(line, "%d", &target)
	} else if err := sc.Err(); err != nil {
		os.Exit(1)
	}

	count := int64(0)
	nums := make([]int64, 0, 100000)

	for sc.Scan() {
		line, _ := sc.Text()
		if line == "" {
			continue
		}
		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err := sc.Err(); err != nil {
			os.Exit(1)
		}
		nums = append(nums, n)
	}

	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
