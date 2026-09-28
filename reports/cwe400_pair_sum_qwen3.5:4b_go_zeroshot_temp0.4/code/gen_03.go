package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	if _, err := fmt.Fscan(reader, &target); err != nil {
		os.Exit(1)
	}

	count := 0
	nums := make([]int64, 0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		var val int64
		if _, err := fmt.Sscan(line, &val); err == nil {
			nums = append(nums, val)
		}
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
