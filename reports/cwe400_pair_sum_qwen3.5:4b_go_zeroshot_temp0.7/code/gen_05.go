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
		return
	}

	count := 0
	nums := make([]int64, 0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		nums = append(nums, val)
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
