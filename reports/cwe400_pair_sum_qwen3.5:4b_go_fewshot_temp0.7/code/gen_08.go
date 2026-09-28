package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if err := sc.Scan(); err != nil {
		return
	}
	targetVal, err := fmt.Sscanf(sc.Text(), "%d", &target)
	if targetVal != 1 || err != nil {
		return
	}

	type num struct {
		val int64
		idx int64
	}
	var nums []num
	lineIdx := 0
	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		parsed, err := fmt.Sscanf(text, "%d", &nums[len(nums)])
		if parsed != 1 || err != nil {
			continue
		}
	}

	var count int64
	for i := int64(0); i < int64(len(nums)); i++ {
		for j := i + 1; j < int64(len(nums)); j++ {
			if nums[i].val+nums[j].val == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
