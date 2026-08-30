package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	if _, err := fmt.Fscanf(reader, "%d", &target); err != nil {
		return
	}

	count := 0
	nums := make([]int64, 0)

	for {
		line, isPrefix, err := reader.ReadBytes('\n')
		if err != nil {
			break
		}
		if isPrefix || len(line) == 0 {
			continue
		}

		var val int64
		fmt.Sscanf(string(line), "%d", &val)
		nums = append(nums, val)
	}

	for i := range nums {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
