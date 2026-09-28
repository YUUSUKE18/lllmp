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

	nums := make([]int64, 0)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if len(line) == 0 {
			continue
		}
		var num int64
		if _, err := fmt.Sscanf(line, "%d", &num); err != nil {
			continue
		}
		nums = append(nums, num)
	}

	count := int64(0)
	seen := make(map[int64]int64)
	for i := 0; i < len(nums); i++ {
		targetMinusCurrent := target - nums[i]
		if count, ok := seen[targetMinusCurrent]; ok {
			count += count
		} else {
			seen[nums[i]] = 1
		}
	}

	fmt.Fprintf(os.Stdout, "pairs=%d\n", count)
}
