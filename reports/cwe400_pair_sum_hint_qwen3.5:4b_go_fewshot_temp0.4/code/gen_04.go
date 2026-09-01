package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		return
	}
	fmt.Sscanf(sc.Text(), "%d", &target)

	var nums []int64
	lineNum := 0
	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		for _, s := range splitInts(text) {
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue
			}
			nums = append(nums, n)
		}
	}

	var count int64
	for i := range nums {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}

func splitInts(s string) []string {
	var res []string
	start := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ' ' || s[i] == '\t' || s[i] == '\n' || s[i] == '\r' || s[i] == '\f' || s[i] == '\v' {
			if i > start {
				res = append(res, s[start:i])
			}
			start = i + 1
		}
	}
	if start < len(s) {
		res = append(res, s[start:])
	}
	return res
}
