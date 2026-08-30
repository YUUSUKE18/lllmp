package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	var nums []int64

	if !sc.Scan() {
		return
	}
	line, _ := sc.ReadBytes('\n')
	for _, r := range line {
		if r >= '0' && r <= '9' || r == '-' {
			target = target*10 + int64(r-'0')
		}
	}

	for i := 0; i < sc.NumScans(); i++ {
		line, _ := sc.ReadBytes('\n')
		if len(line) == 0 {
			continue
		}
		var n int64
		fmt.Sscanf(string(line), "%d", &n)
		nums = append(nums, n)
	}

	count := int64(0)
	for i := range nums {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
