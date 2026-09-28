package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	err := fmt.Fscan(reader, &target)
	if err != nil {
		return
	}

	count := 0
	nums := make([]int64, 0)

	for {
		line, _ := reader.ReadString('\n')
		line = trimEmptyLine(line)
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err != nil {
			break
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

func trimEmptyLine(s string) string {
	s = trimSpace(s)
	if s == "" {
		return ""
	}
	return s
}

func trimSpace(s string) string {
	start := 0
	end := len(s)
	for start < end && (s[start] == ' ' || s[start] == '\t' || s[start] == '\n' || s[start] == '\r') {
		start++
	}
	for end > start && (s[end-1] == ' ' || s[end-1] == '\t' || s[end-1] == '\n' || s[end-1] == '\r') {
		end--
	}
	return s[start:end]
}
