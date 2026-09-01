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

	nums := make([]int64, 0)
	for {
		line, _ := reader.ReadString('\n')
		if line == "" {
			break
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err := fmt.Scan(&val); err != nil {
			break
		}
		nums = append(nums, val)
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
