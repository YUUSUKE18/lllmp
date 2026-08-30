package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err := strconv.Atoi(sc.Text())
	if err != nil || target == 0 {
		fmt.Printf("pairs=0\n")
		return
	}

	var nums []int64
	lineNum := 1
	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		val, err := strconv.Atoi(text)
		if err != nil {
			continue
		}
		nums = append(nums, int64(val))
		lineNum++
	}

	count := 0
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == int64(target) {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
