package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	line, err := reader.ReadString('\n')
	if err != nil || line == "" {
		return
	}
	target, err = fmt.ScanInt64(line)
	if err != nil {
		os.Exit(1)
	}

	nums := make([]int64, 0)
	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF || line == "" {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		val, err := fmt.ScanInt64(line)
		if err != nil {
			continue
		}
		nums = append(nums, val)
	}

	count := int64(0)
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
