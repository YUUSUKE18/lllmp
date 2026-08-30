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
		line, _ := reader.ReadString('\n')
		if line == "" {
			break
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
	s = trimLeft(s)
	s = trimRight(s)
	return s
}

func trimLeft(s string) string {
	for i := 0; i < len(s); i++ {
		if s[i] != ' ' && s[i] != '\t' && s[i] != '\n' && s[i] != '\r' {
			break
		}
	}
	if i == len(s) {
		return ""
	}
	return s[i:]
}

func trimRight(s string) string {
	for i := len(s) - 1; i >= 0; i-- {
		if s[i] != ' ' && s[i] != '\t' && s[i] != '\n' && s[i] != '\r' {
			break
		}
	}
	return s[:i+1]
}

func fmt.ScanInt64(s string) (int64, error) {
	var v int64
	fmt.Sscanf(s, "%d", &v)
	return v, nil
}
