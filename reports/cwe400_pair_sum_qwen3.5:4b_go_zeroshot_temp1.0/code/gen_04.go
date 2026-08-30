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
		os.Exit(1)
	}

	nums := make(map[int64]int)
	count := int64(0)

	var sum int64
	for {
		line, _ := reader.ReadBytes('\n')
		if len(line) == 0 {
			break
		}
		var val int64
		if _, err := fmt.Sscanf(string(line), "%d", &val); err != nil {
			continue
		}

		if sum+val == target {
			count += int64(nums[val])
		} else if sum < target {
			if nums[sum] > 0 {
				nums[sum]--
			} else {
				sum = val + sum
			}
		}

		if nums[val] > 0 {
			count += int64(nums[sum]) - 1
		}

		nums[sum+val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
