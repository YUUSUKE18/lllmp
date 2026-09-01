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
	if err != nil {
		return
	}
	target, err = fmt.ScanInt64(line)
	if err != nil {
		return
	}

	nums := make([]int64, 0)
	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF {
			break
		}
		if err != nil {
			continue
		}
		line = trimLine(line)
		if line == "" {
			continue
		}
		val, err := fmt.ScanInt64(line)
		if err != nil {
			continue
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

func trimLine(s string) string {
	s = strings.TrimSpace(s)
	return s
}
