package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	target, err := r.ReadString('\n')
	if err != nil || target == "" {
		fmt.Println("pairs=0")
		return
	}

	var targetVal int64
	_, err = fmt.Sscanf(target, "%d", &targetVal)
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	type num struct {
		val   int64
		index int
	}

	nums := make([]num, 0)
	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		if line == "" || len(line) == 1 && line[0] == '\n' {
			continue
		}

		var val int64
		fmt.Sscanf(line, "%d", &val)
		if fmt.Scanf("%d", &val) == 1 {
			nums = append(nums, num{val, len(nums)})
		}
	}

	count := 0
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i].val+nums[j].val == targetVal {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
