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

	count := 0
	nums := make([]int64, 0)

	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF {
			break
		}
		if err != nil {
			continue
		}
		line = trimWhitespace(line)
		if line == "" {
			continue
		}
		val, err := fmt.ScanInt64(line)
		if err != nil {
			continue
		}
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

func trimWhitespace(s string) string {
	start := 0
	end := len(s)
	for start < end && s[start] == ' ' {
		start++
	}
	for end > start && s[end-1] == ' ' {
		end--
	}
	if start >= end {
		return ""
	}
	return s[start:end]
}
