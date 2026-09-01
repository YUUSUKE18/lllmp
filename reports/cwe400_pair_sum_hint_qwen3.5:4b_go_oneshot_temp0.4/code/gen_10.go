package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	lineNum := 0

	for sc.Scan() {
		text := sc.Text()
		if len(text) == 0 {
			continue
		}

		var n int64
		fmt.Sscanf(text, "%d", &n)
		if err := sc.Err(); err != nil {
			break
		}

		lineNum++
		if lineNum == 1 {
			target = n
			continue
		}

		nums := append(nums, n)
	}

	count := 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i] + nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
