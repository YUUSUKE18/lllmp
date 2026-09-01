package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() || sc.Text() == "" {
		return
	}
	target, _ = fmt.Sscanf(sc.Text(), "%d", &target)

	nums := []int64{}
	for i := 0; ; i++ {
		if !sc.Scan() {
			break
		}
		line := sc.Text()
		if line == "" {
			continue
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err := sc.Err(); err != nil {
			break
		}
		nums = append(nums, val)
	}

	count := 0
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
